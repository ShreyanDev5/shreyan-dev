
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Mail, Send, Github, Linkedin, Calendar } from "lucide-react";

// Form validation schema
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters").max(1000)
});

type FormValues = z.infer<typeof formSchema>;

const ContactForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: ""
    }
  });
  
  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      // Formspree submission
      const response = await fetch("https://formspree.io/f/your-form-id", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      
      if (response.ok) {
        toast.success("✅ Message sent! I'll respond within 24 hours.");
        form.reset();
      } else {
        throw new Error("Failed to submit form");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again later.");
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 px-4 relative overflow-hidden" id="contact">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-darkBlue via-darkBlue to-darkPurple/70 z-0" />
      
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
            <Mail size={32} className="text-emerald-500" aria-hidden="true" />
            <span>Get in Touch</span>
            <span className="sr-only">Contact Section</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Got a project or collaboration idea? Let's connect! 👋 Drop me a message below.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="contact-card p-8 max-w-[600px] mx-auto transform-gpu" // Added contact card styling
        >
          <div className="flex flex-col gap-8">
            {/* Contact form */}
            <div className="w-full">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="name" className="text-gray-200">Full Name</FormLabel>
                        <FormControl>
                          <Input 
                            id="name"
                            placeholder="Your Name" 
                            {...field}
                            className="bg-darkBlue/50 border-white/10 focus:border-emerald-500/50 text-white"
                            aria-describedby="name-error"
                            tabIndex={1}
                          />
                        </FormControl>
                        <FormMessage id="name-error" className="text-red-400" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="email" className="text-gray-200">Email Address</FormLabel>
                        <FormControl>
                          <Input 
                            id="email"
                            placeholder="email@example.com" 
                            {...field}
                            className="bg-darkBlue/50 border-white/10 focus:border-emerald-500/50 text-white"
                            aria-describedby="email-error"
                            tabIndex={2}
                          />
                        </FormControl>
                        <FormMessage id="email-error" className="text-red-400" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="message" className="text-gray-200">Your Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            id="message"
                            placeholder="How can I help you?" 
                            {...field}
                            className="bg-darkBlue/50 border-white/10 focus:border-emerald-500/50 text-white min-h-[120px]"
                            aria-describedby="message-error"
                            tabIndex={3}
                            rows={5}
                          />
                        </FormControl>
                        <FormMessage id="message-error" className="text-red-400" />
                      </FormItem>
                    )}
                  />
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="get-in-touch px-6 py-3 text-lg w-full md:w-auto rounded-lg transform-gpu"
                    tabIndex={4}
                  >
                    {isSubmitting ? "Sending..." : (
                      <>
                        <span>Send Message</span>
                        <Send size={18} className="ml-2" aria-hidden="true" />
                      </>
                    )}
                  </Button>
                </form>
              </Form>

              {/* Social Links */}
              <div className="mt-10 pt-6 border-t border-white/10">
                <p className="text-center text-gray-300 mb-4">Or connect with me on:</p>
                <div className="flex justify-center items-center gap-6">
                  <a 
                    href="https://linkedin.com/in/your-profile" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-darkBlue/50 hover:bg-darkBlue transition-all duration-300 hover:scale-110"
                    aria-label="LinkedIn Profile"
                  >
                    <Linkedin size={24} className="text-emerald-500" />
                    <span className="sr-only">LinkedIn</span>
                  </a>
                  <a 
                    href="https://github.com/your-username" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-darkBlue/50 hover:bg-darkBlue transition-all duration-300 hover:scale-110"
                    aria-label="GitHub Profile"
                  >
                    <Github size={24} className="text-gray-200" />
                    <span className="sr-only">GitHub</span>
                  </a>
                  <div>
                    <p className="text-sm text-gray-400 mb-2 text-center">Prefer scheduling?</p>
                    <a 
                      href="https://calendly.com/your-username" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-3 rounded-full bg-darkBlue/50 hover:bg-darkBlue transition-all duration-300 hover:scale-110 flex items-center gap-2"
                      aria-label="Schedule a meeting"
                    >
                      <Calendar size={24} className="text-emerald-500" />
                      <span className="text-sm text-gray-300">Schedule Meeting</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactForm;
