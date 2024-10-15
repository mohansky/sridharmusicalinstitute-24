import { EmailTemplate } from "@/components/emails/email-template";
import { formSchema } from "@/lib/formValidation";
import { z } from "zod";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const onFormAction = async (
  prevState: {
    message: string;
    user?: z.infer<typeof formSchema>;
    issues?: string[];
  },
  formData: FormData
) => {
  "use server";
  const data = Object.fromEntries(formData);
  const parsed = formSchema.safeParse(data);

  if (parsed.success) {
    await resend.emails.send({
      from: "MK <mail@mohankumar.dev>",
      to: "mohansky@gmail.com",
      subject: `Enquiry from ${parsed.data.senderName}`,
      replyTo: parsed.data.email as string,
      react: EmailTemplate({
        senderName: parsed.data.senderName as string,
        phone: parsed.data.phone as string,
        email: parsed.data.email as string,
        message: parsed.data.message as string,
      }),
    });
      return {
      message: "Form submitted thank you for your interest.",
      email: parsed.data,
    };
  } 
  else {
    return {
      message: "Invalid data",
      issues: parsed.error.issues.map((issue) => issue.message),
    };
  }
};
