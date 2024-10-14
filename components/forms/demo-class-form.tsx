"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DialogClose, DialogFooter } from "../ui/dialog";
import { demoFormSchema } from "@/lib/demoFormValidation";
import { useFormState, useFormStatus } from "react-dom";
import { useEffect, useRef } from "react";
import { Heading } from "../custom-ui/heading";

function Submit() {
  const { pending } = useFormStatus();
  return (
    <Button size="lg" type="submit" disabled={pending}>
      {pending ? "Submitting..." : "Submit"}
    </Button>
  );
}

interface DemoClassFormProps {
  fetchTitle: string;
  onDemoFormAction: (
    prevState: {
      message: string;
      user?: z.infer<typeof demoFormSchema>;
      issues?: string[];
    },
    formData: FormData
  ) => Promise<{
    message: string;
    user?: z.infer<typeof demoFormSchema>;
    issues?: string[];
  }>;
}

// export const DemoClassForm = (
//   {
//     fetchTitle,
//     onDemoFormAction,
//   }: {
//     onDemoFormAction: (
//       prevState: {
//         message: string;
//         user?: z.infer<typeof demoFormSchema>;
//         issues?: string[];
//       },
//       data: FormData
//     ) => Promise<{
//       message: string;
//       user?: z.infer<typeof demoFormSchema>;
//       issues?: string[];
//     }>;
//   },
//   { fetchTitle: string }
// ) => {

export const DemoClassForm: React.FC<DemoClassFormProps> = ({
  fetchTitle,
  onDemoFormAction,
}) => {
  const [state, formAction] = useFormState(onDemoFormAction, {
    message: "",
  });

  // 1. Define your form.
  const form = useForm<z.infer<typeof demoFormSchema>>({
    resolver: zodResolver(demoFormSchema),
    defaultValues: {
      senderName: "",
      email: "",
      phone: "",
      title: fetchTitle,
    },
  });

  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit = async (data: z.infer<typeof demoFormSchema>) => {
    if (formRef.current) {
      const formData = new FormData(formRef.current);
      formAction(formData);
    }
  };

  useEffect(() => {
    if (state.message) {
      console.log("Form submission result:", state);
      if (!state.issues) {
        form.reset();
      }
    }
  }, [state, form]);

  return (
    <Form {...form}>
      <Heading size="xs" className="text-center text-primary">
        {state?.message}
      </Heading>
      <form
        ref={formRef}
        // action={formAction}
        // onSubmit={form.handleSubmit(() => formRef.current?.submit())}
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 w-full"
      >
        {/* <Input value={fetchTitle} className="hidden" /> */}
        <input id="title" name="title" type="hidden" value={fetchTitle} />
        <FormField
          control={form.control}
          name="senderName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Full Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input placeholder="Phone" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <DialogFooter className="sm:justify-start">
          <Submit />
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </form>
    </Form>
  );
};
