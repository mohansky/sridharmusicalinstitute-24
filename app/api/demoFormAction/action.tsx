import { DemoEmailTemplate } from "@/components/emails/demo-email-template";
import { demoFormSchema } from "@/lib/demoFormValidation";
import { z } from "zod";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const onDemoFormAction = async (
  prevState: {
    message: string;
    user?: z.infer<typeof demoFormSchema>;
    issues?: string[];
  },
  formData: FormData
) => {
  "use server";

  const data = Object.fromEntries(formData);
  const parsed = demoFormSchema.safeParse(data);

  if (parsed.success) {
    try {
      console.log(parsed.data);
      await resend.emails.send({
        from: "MK <mail@mohankumar.dev>",
        to: "mohansky@gmail.com",
        subject: `Demo ${parsed.data.title} class for ${parsed.data.senderName}.`,
        replyTo: parsed.data.email,
        react: DemoEmailTemplate({
          senderName: parsed.data.senderName as string,
          phone: parsed.data.phone as string,
          email: parsed.data.email as string,
          title: parsed.data.title as string,
        }),
      });

      return {
        message: "Form submitted. Thank you for your interest.",
        user: parsed.data,
      };
    } catch (error) {
      console.error("Failed to send email:", error);
      return {
        message: "Failed to submit form. Please try again later.",
        issues: ["An error occurred while processing your request."],
      };
    }
  } else {
    return {
      message: "Invalid data",
      issues: parsed.error.issues.map((issue) => issue.message),
    };
  }
};
