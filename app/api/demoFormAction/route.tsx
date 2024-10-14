// import { DemoEmailTemplate } from "@/components/demo-email-template";
// import { demoFormSchema } from "@/lib/demoFormValidation";
// import { z } from "zod";
// import { Resend } from "resend";

// const resend = new Resend(process.env.RESEND_API_KEY);

// export const onDemoFormAction = async (
//   prevState: {
//     message: string;
//     user?: z.infer<typeof demoFormSchema>;
//     issues?: string[];
//   },
//   formData: FormData,
// ) => {
//   "use server";
//   const data = Object.fromEntries(formData);
//   const parsed = demoFormSchema.safeParse(data);
//   console.log(parsed);

//   if (parsed.success) {

//     await resend.emails.send({
//       from: "MK <mail@mohankumar.dev>",
//       to: "mohansky@gmail.com",
//       subject: `Enquiry from ${parsed.data.senderName}`,
//       replyTo: parsed.data.email as string,
//       react: DemoEmailTemplate({
//         senderName: parsed.data.senderName as string,
//         phone: parsed.data.phone as string,
//         email: parsed.data.email as string,
//         title: parsed.data.title as string,
//       }),
//     });
//       return {
//       message: "Form submitted thank you for your interest.",
//       email: parsed.data,
//       // fields,
//     };
//   }
//   else {
//     return {
//       message: "Invalid data",
//       issues: parsed.error.issues.map((issue) => issue.message),
//       // fields,
//     };
//   }
// };

// "use server"
import { DemoEmailTemplate } from "@/components/emails/demo-email-template";
import { demoFormSchema } from "@/lib/demoFormValidation";
import { z } from "zod";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function onDemoFormAction(
  prevState: {
    message: string;
    user?: z.infer<typeof demoFormSchema>;
    issues?: string[];
  },
  formData: FormData
): Promise<{
  message: string;
  user?: z.infer<typeof demoFormSchema>;
  issues?: string[];
}> {
  "use server";

  const data = Object.fromEntries(formData);
  const parsed = demoFormSchema.safeParse(data);
  // console.log(parsed, "hi");

  if (parsed.success) {
    try {
      console.log(parsed.data);
      await resend.emails.send({
        from: "MK <mail@mohankumar.dev>",
        to: "mohansky@gmail.com",
        subject: `Demo ${parsed.data.title} class for ${parsed.data.senderName}.`,
        replyTo: parsed.data.email,
        react: DemoEmailTemplate({
          senderName: parsed.data.senderName,
          phone: parsed.data.phone,
          email: parsed.data.email,
          title: parsed.data.title,
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
}
