'use client';
import githublogo from '@/assets/icons/githublogo.png';
import instagramlogo from '@/assets/icons/instagramlogo.png';
import linkedinlogo from '@/assets/icons/linkedinlogo.png';
import maillogo from '@/assets/icons/maillogo.png';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, SendHorizonal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  contactSchema,
  sendContactForm,
  type ContactFormValues,
} from '@/lib/contact.service';
import { toast, Toaster } from 'sonner';
import Footer from '@/components/Footer';
import Image, { StaticImageData } from 'next/image';

function SuccessMessage({ onReset }: { onReset: () => void }) {
  return (
    <div className='flex flex-col justify-center text-center items-center gap-6 py-8'>
      <SendHorizonal className='w-12 h-12 text-primary' />
      <h2 className='text-3xl font-extralight'>Message received.</h2>
      <p className='text-muted-foreground'>
        Thank you for reaching out. I&apos;ll be in touch with you shortly.
      </p>
      <Button variant='link' onClick={onReset}>
        Send another message
      </Button>
    </div>
  );
}

interface SocialLink {
  icon: StaticImageData;
  href: string;
  title: string;
}

export default function Contacts() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
    },
  });

  const onSubmit = async (values: ContactFormValues) => {
    setIsSubmitting(true);
    try {
      await sendContactForm(values);
      setSubmitted(true);
      toast.success('Message sent', {
        description: 'Your message has been sent successfully.',
      });
    } catch (error: any) {
      toast.error('Failed to send message', {
        description: error.message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks: SocialLink[] = [
    {
      icon: linkedinlogo,
      href: 'https://www.linkedin.com/in/rin-m-b28910234/',
      title: 'LinkedIn',
    },
    {
      icon: instagramlogo,
      href: 'https://www.instagram.com/rin.m04/?theme=dark',
      title: 'Instagram',
    },
    {
      icon: maillogo,
      href: 'mailto:mail@rinm.dev',
      title: 'Email',
    },
    {
      icon: githublogo,
      href: 'https://github.com/rinmeng',
      title: 'GitHub',
    },
  ];

  return (
    <div className='animate-fade-in animate-duration-500'>
      <div className='container py-16 mx-auto rounded-none shadow-none border-y-0 border-x'></div>
      <div className='border-b w-full border-dashed'></div>

      <Card className='container mx-auto gap-0 py-0 rounded-none border-y-0 '>
        <div className='h-auto  w-full flex items-center justify-center'>
          <Card className='container m-5 w-full max-w-6xl overflow-hidden gap-0 '>
            <CardContent className='p-0 flex flex-col lg:flex-row relative'>
              {/* Social Media Cards Section */}
              <div className='w-full lg:w-1/3 flex flex-col justify-center items-center p-6'>
                <div className='w-full grow justify-center flex flex-col space-y-2'>
                  <h2 className='text-3xl font-bold text-center pb-2'>
                    Connect With Me
                  </h2>
                  {socialLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.href}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      <Card className='hover:shadow-lg transition-all duration-200 hover:-translate-y-1 bg-secondary-foreground'>
                        <CardHeader className='flex flex-row items-center justify-between lg:justify-start space-x-4'>
                          <Image
                            src={link.icon}
                            alt={link.title}
                            width={48}
                            height={48}
                            className='dark:invert not-dark:invert-0'
                          />
                          <CardTitle className='text-xl font-extralight text-primary-foreground'>
                            {link.title}
                          </CardTitle>
                        </CardHeader>
                      </Card>
                    </a>
                  ))}
                </div>
              </div>

              {/* Divider Line */}
              <div className='hidden lg:block absolute left-1/3 top-0 bottom-0 w-0.5 bg-muted my-8'></div>
              <div className='block lg:hidden w-full h-0.5 bg-muted my-4'></div>

              {/* Contact Form Section */}
              <div className='w-full lg:w-2/3 p-6 items-center'>
                {submitted ? (
                  <SuccessMessage
                    onReset={() => {
                      form.reset();
                      setSubmitted(false);
                    }}
                  />
                ) : (
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className='space-y-6'
                    >
                      <h2 className='text-3xl font-bold text-center mb-6'>
                        Directly Contact Me
                      </h2>

                      <FormField
                        control={form.control}
                        name='name'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name *</FormLabel>
                            <FormControl>
                              <Input placeholder='Jane Doe' {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name='email'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email *</FormLabel>
                            <FormControl>
                              <Input
                                type='email'
                                placeholder='jane@example.com'
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name='phone'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                              <Input
                                type='tel'
                                placeholder='(XXX) XXX-XXXX'
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name='message'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Message</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder='A very brief message that can strike up a conversation...'
                                className='min-h-32 resize-none'
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button
                        disabled={isSubmitting}
                        type='submit'
                        variant='default'
                        className='w-full'
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className='animate-spin' />
                            Sending...
                          </>
                        ) : (
                          'Send Message'
                        )}
                      </Button>
                    </form>
                  </Form>
                )}
              </div>
            </CardContent>
          </Card>

          <Toaster />
        </div>
      </Card>

      <Footer />
    </div>
  );
}
