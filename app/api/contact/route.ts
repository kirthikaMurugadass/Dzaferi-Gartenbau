import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { contactFormSchema } from "@/lib/validations";
import { writeClient } from "@/sanity/lib/writeClient";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = contactFormSchema.parse(body);

    // Validate required fields
    if (!validated.name || !validated.email || !validated.message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Save to Sanity CMS
    const submission = await writeClient.create({
      _type: 'contactSubmission',
      name: validated.name,
      email: validated.email,
      phone: validated.phone || undefined,
      subject: validated.service || undefined,
      message: validated.message,
      locale: validated.locale || 'en',
      submittedAt: new Date().toISOString(),
      status: 'new',
    });

    console.log("Contact form submission saved to Sanity:", submission._id);

    return NextResponse.json({ 
      success: true,
      id: submission._id 
    });
  } catch (error) {
    console.error("Error saving contact submission:", error);
    
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: "Failed to submit form. Please try again." },
      { status: 500 }
    );
  }
}
