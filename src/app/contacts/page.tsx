'use client';
import githublogo from '@/assets/icons/githublogo.png';
import instagramlogo from '@/assets/icons/instagramlogo.png';
import linkedinlogo from '@/assets/icons/linkedinlogo.png';
import maillogo from '@/assets/icons/maillogo.png';
import youtubelogo from '@/assets/icons/youtubelogo.png';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, SendHorizonal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
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
    <div className='flex flex-col justify-center items-center gap-6 py-16 text-center'>
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
    } catch (error: unknown) {
      toast.error('Failed to send message', {
        description: error instanceof Error ? error.message : 'Unknown error',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks: SocialLink[] = [
    {
      icon: youtubelogo,
      href: 'https://www.youtube.com/@rinmeng',
      title: 'YouTube',
    },
    {
      icon: linkedinlogo,
      href: 'https://www.linkedin.com/in/rinmeng/',
      title: 'LinkedIn',
    },
    {
      icon: instagramlogo,
      href: 'https://www.instagram.com/rin.m04/?theme=dark',
      title: 'Instagram',
    },
    {
      icon: githublogo,
      href: 'https://github.com/rinmeng',
      title: 'GitHub',
    },
    {
      icon: maillogo,
      href: 'mailto:mail@rinm.dev',
      title: 'Email',
    },
    {
      icon: youtubelogo,
      href: 'https://www.youtube.com/@rinmeng',
      title: 'YouTube',
    },
  ];

  return (
    <div className='animate-fade-in animate-duration-500 min-h-screen flex flex-col'>
      {/* Page header */}
      <div className='container py-16 mx-auto rounded-none shadow-none border-y-0 border-x' />
      <div className='border-b w-full border-dashed' />

      <div className='container mx-auto border-x flex-1'>
        {/* Hero */}
        <div className='px-6 pt-12 pb-8 border-b border-dashed'>
          <h1 className='text-4xl font-bold tracking-tight'>Get in touch</h1>
          <p className='text-muted-foreground mt-2 max-w-md'>
            Send me a message or connect on any of my socials.
          </p>
        </div>

        {/* Main content */}
        <div className='flex flex-col lg:flex-row'>
          {/* Form panel */}
          <div className='grow px-6 py-8 lg:border-r border-dashed flex flex-col'>
            {submitted ? (
              <SuccessMessage
                onReset={() => {
                  form.reset();
                  setSubmitted(false);
                }}
              />
            ) : (
              <Form {...form} className='flex flex-col flex-1'>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className='space-y-5 flex flex-col flex-1'
                >
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
                    name='message'
                    render={({ field }) => (
                      <FormItem className='flex flex-col flex-1'>
                        <FormLabel>Message</FormLabel>
                        <FormControl className='flex-1'>
                          <Textarea
                            placeholder='A very brief message that can strike up a conversation...'
                            className='resize-none h-full min-h-36'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className='flex w-full justify-end'>
                    <Button
                      disabled={isSubmitting}
                      type='submit'
                      variant='default'
                      className='w-full sm:w-auto px-8'
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className='animate-spin mr-2' />
                          Sending...
                        </>
                      ) : (
                        'Send Message'
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            )}
          </div>

          {/* Socials panel */}
          <div className='lg:w-72 px-6 py-8 border-t lg:border-t-0 border-dashed'>
            <h2 className='text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-4'>
              Socials
            </h2>
            <div className='flex flex-col gap-2'>
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <Card className='hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 bg-secondary-foreground'>
                    <CardContent className='flex flex-row justify-between items-center gap-4 px-4 py-0'>
                      <Image
                        src={link.icon}
                        alt={link.title}
                        width={32}
                        height={32}
                        className='dark:invert not-dark:invert-0 shrink-0'
                      />
                      <span className='text-base font-extralight text-primary-foreground'>
                        {link.title}
                      </span>
                    </CardContent>
                  </Card>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Toaster />
      <Footer />
    </div>
  );
}
