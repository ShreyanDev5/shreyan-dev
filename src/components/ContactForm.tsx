import React, { useState, memo } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/sonner";
import { Send, Github, Linkedin } from "lucide-react";

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
      // Formspree submission using the actual endpoint
      const response = await fetch("https://formspree.io/f/xnnbeopz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      
      if (response.ok) {
        toast.success("✅ Message sent! I'll respond within 24 hours.", {
          duration: 5000,
          position: "top-center"
        });
        form.reset();
      } else {
        const errorText = await response.text();
        console.error("Form submission error response:", errorText);
        toast.error("Failed to send message. Please try again.", {
          duration: 5000,
          position: "top-center"
        });
      }
    } catch (error: any) {
      console.error("Form submission error:", error);
      let errorMessage = "Something went wrong. Please try again later.";
      
      if (error instanceof TypeError && error.message.includes("fetch")) {
        errorMessage = "Network error. Please check your connection and try again.";
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      toast.error(errorMessage, {
        duration: 5000,
        position: "top-center"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-12 sm:py-16 px-4 relative overflow-hidden" id="contact">
      {/* Subtle circuit pattern overlay - hidden on mobile, visible on desktop */}
      <div className="absolute inset-0 bg-circuit-pattern opacity-0 sm:opacity-5 z-0" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="text-center mb-6 sm:mb-12"
          // Performance optimization
          style={{ 
            willChange: 'opacity, transform',
            transform: 'translateZ(0)'
          }}
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold mb-3 sm:mb-6 tracking-tight heading-gradient-neutral" style={{ lineHeight: '1.2' }}>
            Let's Create the Future
          </h2>
          <div className="text-gray-400 max-w-2xl mx-auto px-2">
            <p className="text-base sm:text-lg md:text-xl font-light" style={{ lineHeight: '1.6' }}>
              Have a vision or idea you're passionate about? Let's make it real — <span className="italic font-medium">together</span>.
            </p>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="rounded-lg sm:rounded-2xl bg-gradient-to-br from-[#141417] via-[#16161a] to-[#1a1a1f] p-4 sm:p-6 md:p-8 border border-white/5"
          // Performance optimization
          style={{ 
            willChange: 'opacity, transform',
            transform: 'translateZ(0)'
          }}
        >
          <div className="flex flex-col gap-5 sm:gap-6 md:gap-8">
            {/* Contact form */}
            <div className="w-full">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-5 md:space-y-7">
                  {/* Name field - optimized for mobile */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="name" className="text-gray-200 text-sm sm:text-base font-medium" style={{ lineHeight: '1.5' }}>Full Name</FormLabel>
                        <FormControl>
                          <Input 
                            id="name"
                            placeholder="Your Name" 
                            {...field}
                            className="bg-[#1a1a1f]/60 border-white/10 focus:border-emerald-500/50 text-white h-10 sm:h-11 md:h-12 rounded-lg hover:bg-[#1a1a1f]/80 text-sm sm:text-base"
                            aria-describedby="name-error"
                            tabIndex={1}
                          />
                        </FormControl>
                        <FormMessage id="name-error" className="text-red-400 text-xs sm:text-sm" />
                      </FormItem>
                    )}
                  />
                  
                  {/* Email field - optimized for mobile */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="email" className="text-gray-200 text-sm sm:text-base font-medium" style={{ lineHeight: '1.5' }}>Email Address</FormLabel>
                        <FormControl>
                          <Input 
                            id="email"
                            placeholder="email@example.com" 
                            {...field}
                            className="bg-[#1a1a1f]/60 border-white/10 focus:border-emerald-500/50 text-white h-10 sm:h-11 md:h-12 rounded-lg hover:bg-[#1a1a1f]/80 text-sm sm:text-base"
                            aria-describedby="email-error"
                            tabIndex={2}
                          />
                        </FormControl>
                        <FormMessage id="email-error" className="text-red-400 text-xs sm:text-sm" />
                      </FormItem>
                    )}
                  />
                  
                  {/* Message field - optimized for mobile */}
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="message" className="text-gray-200 text-sm sm:text-base font-medium" style={{ lineHeight: '1.5' }}>Your Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            id="message"
                            placeholder="How can I help you?" 
                            {...field}
                            className="bg-[#1a1a1f]/60 border-white/10 focus:border-emerald-500/50 text-white min-h-[100px] sm:min-h-[120px] md:min-h-[140px] rounded-lg resize-none hover:bg-[#1a1a1f]/80 text-sm sm:text-base"
                            aria-describedby="message-error"
                            tabIndex={3}
                            rows={4}
                          />
                        </FormControl>
                        <FormMessage id="message-error" className="text-red-400 text-xs sm:text-sm" />
                      </FormItem>
                    )}
                  />
                  
                  {/* Enhanced submit button - optimized for mobile */}
                  <div className="flex justify-end">
                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      size="lg"
                      className="w-full sm:w-auto rounded-lg bg-[#059669] hover:bg-[#059669] text-white px-5 py-2.5 sm:px-6 sm:py-3 md:px-8 md:py-3.5 h-auto text-sm font-medium"
                      tabIndex={4}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center gap-2">
                          <span className="animate-spin">⚡</span>
                          Sending...
                        </span>
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          Send Message
                          <Send size={14} className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
                        </span>
                      )}
                    </Button>
                  </div>
                  {/* Form submission status indicator */}
                  <div className="flex justify-center mt-2">
                    {isSubmitting && (
                      <p className="text-sm text-emerald-400 flex items-center">
                        <span className="animate-pulse">Submitting your message...</span>
                      </p>
                    )}
                  </div>
                </form>
              </Form>

              {/* Enhanced Social Links Section - optimized for mobile */}
              <div className="mt-6 sm:mt-8 md:mt-12 pt-5 sm:pt-6 md:pt-8">
                <div className="relative flex items-center justify-center mb-5 sm:mb-6 md:mb-8">
                  <div className="flex-grow h-px bg-white/10"></div>
                  <span className="mx-3 sm:mx-4 text-gray-400 text-xs sm:text-sm font-medium">Connect with me</span>
                  <div className="flex-grow h-px bg-white/10"></div>
                </div>
                
                <div className="flex justify-center items-center gap-3 sm:gap-4 md:gap-6">
                  <SocialLink 
                    href="https://www.linkedin.com/in/shreyansardar/" 
                    icon={<Linkedin size={18} strokeWidth={2} />}
                    label="LinkedIn"
                    color="#0A66C2"
                  />
                  
                  <SocialLink 
                    href="https://github.com/ShreyanDev5" 
                    icon={<Github size={18} strokeWidth={2} />}
                    label="GitHub"
                    color="white"
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Memoized SocialLink component for better performance
const SocialLink: React.FC<{ 
  href: string; 
  icon: React.ReactNode; 
  label: string;
  color: string;
}> = memo(({ href, icon, label, color }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer"
    className="group relative p-2.5 sm:p-3 md:p-4 rounded-xl bg-gradient-to-br from-white/5 to-white/2 border border-white/10 hover:border-white/20 transition-all duration-300"
    aria-label={`${label} Profile`}
    // Performance optimization
    style={{ 
      willChange: 'transform, box-shadow, border-color',
      transform: 'translateZ(0)',
      backfaceVisibility: 'hidden'
    }}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-white/2 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    <div 
      className="relative transition-transform duration-200 group-hover:scale-110" 
      style={{ color }}
    >
      {icon}
    </div>
    <span className="sr-only">{label}</span>
  </a>
));

export default ContactForm;
