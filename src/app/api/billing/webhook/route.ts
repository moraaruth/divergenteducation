import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { connectDB } from "@/lib/db";
import { TenantModel } from "@/models/index";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig  = req.headers.get("stripe-signature")!;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  await connectDB();

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const { tenantId, plan } = session.metadata ?? {};
      if (tenantId && plan) {
        await TenantModel.findByIdAndUpdate(tenantId, {
          subscriptionTier:   plan,
          subscriptionStatus: "active",
          stripeSubscriptionId: session.subscription,
        });
      }
      break;
    }
    case "customer.subscription.deleted": {
      const sub = event.data.object as Stripe.Subscription;
      await TenantModel.findOneAndUpdate(
        { stripeSubscriptionId: sub.id },
        { subscriptionStatus: "canceled", subscriptionTier: "free" }
      );
      break;
    }
    case "invoice.payment_failed": {
      const invoice = event.data.object as Stripe.Invoice;
      await TenantModel.findOneAndUpdate(
        { stripeCustomerId: invoice.customer },
        { subscriptionStatus: "past_due" }
      );
      break;
    }
  }

  return NextResponse.json({ received: true });
}
