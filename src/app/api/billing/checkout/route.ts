import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { connectDB } from "@/lib/db";
import { TenantModel } from "@/models/index";
import { verifyAccessToken } from "@/lib/auth";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const PLANS: Record<string, string> = {
  starter:    process.env.STRIPE_PRICE_STARTER    ?? "price_starter",
  pro:        process.env.STRIPE_PRICE_PRO        ?? "price_pro",
  enterprise: process.env.STRIPE_PRICE_ENTERPRISE ?? "price_enterprise",
};

export async function POST(req: NextRequest) {
  try {
    const token = req.headers.get("authorization")?.slice(7);
    if (!token) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    const jwt = verifyAccessToken(token);

    if (!["school_admin","super_admin"].includes(jwt.role)) {
      return NextResponse.json({ success: false, error: "Forbidden" }, { status: 403 });
    }

    await connectDB();
    const { plan } = await req.json();
    const priceId = PLANS[plan];
    if (!priceId) return NextResponse.json({ success: false, error: "Invalid plan" }, { status: 400 });

    const tenant = await TenantModel.findById(jwt.tenantId);
    if (!tenant) return NextResponse.json({ success: false, error: "Tenant not found" }, { status: 404 });

    let customerId = tenant.stripeCustomerId;
    if (!customerId) {
      const customer = await stripe.customers.create({ name: tenant.name, metadata: { tenantId: jwt.tenantId } });
      customerId = customer.id;
      await TenantModel.findByIdAndUpdate(jwt.tenantId, { stripeCustomerId: customerId });
    }

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/admin?upgraded=true`,
      cancel_url:  `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
      metadata: { tenantId: jwt.tenantId, plan },
    });

    return NextResponse.json({ success: true, data: { url: session.url } });
  } catch {
    return NextResponse.json({ success: false, error: "Billing error" }, { status: 500 });
  }
}
