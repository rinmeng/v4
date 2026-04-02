import { StaticImageData } from 'next/image';

// Import all logos
import ViteLogo from '@/assets/logos/vite-svgrepo-com.svg';
import ReactLogo from '@/assets/logos/react-svgrepo-com.svg';
import TailwindCSSLogo from '@/assets/logos/tailwindcss-icon-svgrepo-com.svg';
import ExpressLogo from '@/assets/logos/express-svgrepo-com.svg';
import ShadCNUILogo from '@/assets/logos/shadcnui-white.svg';
import DockerLogo from '@/assets/logos/docker-svgrepo-com.svg';
import NodeJSLogo from '@/assets/logos/node-js-svgrepo-com.svg';
import HTML5Logo from '@/assets/logos/html-5-svgrepo-com.svg';
import CSS3Logo from '@/assets/logos/css-svgrepo-com.svg';
import GitLogo from '@/assets/logos/git-svgrepo-com.svg';
import PostgreSQLLogo from '@/assets/logos/postgresql-svgrepo-com.svg';
import JavaScriptLogo from '@/assets/logos/javascript-svgrepo-com.svg';
import TypeScriptLogo from '@/assets/logos/typescript-svgrepo-com.svg';
import VercelLogo from '@/assets/logos/vercel-fill-white.svg';
import SupabaseLogo from '@/assets/logos/supabase-seeklogo.svg';
import JavaLogo from '@/assets/logos/java-svgrepo-com.svg';
import AndroidStudioLogo from '@/assets/logos/androidstudio-svgrepo-com.svg';
import FirebaseLogo from '@/assets/logos/firebase-svgrepo-com.svg';
// import PythonLogo from "@/assets/logos/python-svgrepo-com.svg";
import GitHubLogo from '@/assets/logos/github-white.svg';
import MySQLLogo from '@/assets/logos/mysql-svgrepo-com.svg';
import CSharpLogo from '@/assets/logos/csharp-svgrepo-com.svg';
import UnityLogo from '@/assets/logos/unity-svgrepo-com.svg';
import NextJSLogo from '@/assets/logos/next-js-svgrepo-com.svg';

// import images
import KDT from '@/assets/projects/KDT.png';
import tsengphoto from '@/assets/projects/tsengphoto.png';
import tsengphoto_2 from '@/assets/projects/tsengphoto-2.png';
import tsengphoto_3 from '@/assets/projects/tsengphoto-3.png';
import tsengphoto_4 from '@/assets/projects/tsengphoto-4.png';
import RM from '@/assets/projects/RM.png';
import PC8TH from '@/assets/projects/PC8TH.png';
import CTMS from '@/assets/projects/CTMS.png';
import HIKELOWNA from '@/assets/projects/HIKELOWNA.png';
import PHIL331 from '@/assets/projects/PHIL331.png';
import COSC416 from '@/assets/projects/COSC416.png';
import SEAC from '@/assets/projects/SEAC.png';
import NSSS from '@/assets/projects/NSSS.png';

export interface ProjectFragmentProps {
  title: string;
  stacks?: string[];
  images: StaticImageData[];
  description: string;
  link?: string;
  github_link?: string;
}

export const projects: ProjectFragmentProps[] = [
  {
    title: 'Tseng Photo',
    images: [tsengphoto, tsengphoto_2, tsengphoto_3, tsengphoto_4],
    description: `A professional photography portfolio and booking website built for a real client, 
        migrated from Squarespace to a fully custom solution — cutting annual costs by 88%, 
        from $280 to $35/year (the $35 being solely the domain). Every layer of the stack 
        was deliberately chosen to maximize free tiers: Vercel for hosting, Supabase for 
        the database, UploadThing for file storage, and a custom Google Drive image proxy 
        to avoid paid storage entirely. Engineered a dual-source image pipeline organized 
        into a group → collection → image hierarchy, along with a compression pipeline 
        that normalizes all uploads to WebP. Built a custom image component that gracefully 
        handles Vercel's image transformation quota limits — pre-fetching to detect a 402 
        response and falling back to an unoptimized <img> tag so images always render. 
        The project involved close, iterative collaboration with the client through multiple 
        rounds of design consultation and requirement refinement.`,
    link: 'https://tsengphoto.ca',
    github_link: 'https://github.com/rinmeng/tsengphoto',
    stacks: [
      NextJSLogo,
      SupabaseLogo,
      VercelLogo,
      ShadCNUILogo,
      TailwindCSSLogo,
      TypeScriptLogo,
      PostgreSQLLogo,
    ],
  },
  {
    title: "KPop Dance Team's Website",

    images: [KDT],
    description: `Served as Digital Producer and lead developer for KDT @ SUO's public-facing website 
    across multiple iterations, now in its fourth major version. Architected and built 
    a custom CMS that empowers non-technical executives to independently manage 
    sponsorships, positions, and site content — significantly reducing reliance on 
    developer intervention for day-to-day updates.`,
    link: 'https://kdtsuo.vercel.app',
    github_link: 'https://github.com/kdtsuo/v4',
    stacks: [
      NextJSLogo,
      SupabaseLogo,
      VercelLogo,
      ShadCNUILogo,
      TailwindCSSLogo,
      TypeScriptLogo,
      PostgreSQLLogo,
    ],
  },
  {
    title: 'next-shadcn-supabase-starter',
    images: [NSSS],
    description: `An open-source full-stack starter template designed to eliminate repetitive 
      boilerplate when starting new web projects. Ships with enterprise-grade 
      authentication via Supabase Auth, email verification, protected routes, and 
      middleware proxy out of the box. Built around Next.js 15 App Router with 
      API versioning and a modular architecture, so teams can move fast without 
      sacrificing scalability or security. Recently used for Tseng Photo's website.`,
    link: 'https://template.rinm.dev',
    github_link: 'https://github.com/rinmeng/next-shadcn-supabase-starter',
    stacks: [
      NextJSLogo,
      SupabaseLogo,
      VercelLogo,
      ShadCNUILogo,
      TailwindCSSLogo,
      TypeScriptLogo,
      PostgreSQLLogo,
    ],
  },
  {
    title: 'Personal Website',
    images: [RM],
    stacks: [
      NextJSLogo,
      SupabaseLogo,
      VercelLogo,
      ShadCNUILogo,
      TailwindCSSLogo,
      TypeScriptLogo,
      PostgreSQLLogo,
    ],
    description: `A living record of my growth as a developer, rebuilt from the ground up across 
      five distinct iterations — from plain HTML/CSS to a full Next.js + TypeScript + 
      shadcn/ui stack. Each version reflects the tools and patterns I was learning at 
      the time, making the site itself a portfolio of my evolution as an engineer.`,
    link: 'https://rinmeng.vercel.app',
    github_link: 'https://github.com/rinmeng/v4-rinmeng',
  },
  {
    title: 'CTMS',
    images: [CTMS],
    stacks: [
      HTML5Logo,
      CSS3Logo,
      ViteLogo,
      ReactLogo,
      JavaScriptLogo,
      NodeJSLogo,
      ExpressLogo,
      PostgreSQLLogo,
      GitLogo,
      GitHubLogo,
      DockerLogo,
    ],
    description: `
    A role-based task management system built collaboratively for a course project, 
    where I took on the dual responsibility of Scrum Master and sole full-stack 
    developer. Marked my first deep exposure to RESTful API design and full-stack 
    architecture, bridging a React frontend with a Node.js/Express backend and 
    PostgreSQL database — all containerized with Docker.
    `,
    github_link: 'https://github.com/rinmeng/NodeNinjas',
  },
  {
    title: "SEACSUO's Website",

    images: [SEAC],
    description: `
    Led the design and development of a production-ready website for the South East 
    Asian Club (SEAC) at UBC Okanagan. Beyond building the public-facing site, I 
    developed a custom CMS that lets club executives self-manage events, merchandise, 
    and announcements — removing the bottleneck of requiring a developer for routine 
    content updates.
      `,
    link: 'https://seacsuo.vercel.app',
    github_link: 'https://github.com/seacsuo/v2',
    stacks: [
      NextJSLogo,
      SupabaseLogo,
      VercelLogo,
      ShadCNUILogo,
      TailwindCSSLogo,
      TypeScriptLogo,
      PostgreSQLLogo,
    ],
  },
  {
    title: '3 Big Booms',
    images: [COSC416],
    stacks: [UnityLogo, CSharpLogo],
    description: `A retro-style game developed in Unity for a course Game Jam under a "twist" theme. 
      Our team reimagined the classic Bomberman formula as a 2D platformer, and I owned 
      the core gameplay systems — designing and implementing the power-up mechanics, 
      enemy AI behavior, and weapon interactions. Published on itch.io.`,
    link: 'https://stewdio.itch.io/3-big-booms',
    github_link: 'https://github.com/eagno/cosc416-Project',
  },
  {
    title: 'PHIL331 Project DCE Surveys',
    images: [PHIL331],
    stacks: [
      HTML5Logo,
      CSS3Logo,
      JavaScriptLogo,
      NodeJSLogo,
      ViteLogo,
      ReactLogo,
      TailwindCSSLogo,
      ShadCNUILogo,
      VercelLogo,
      SupabaseLogo,
      PostgreSQLLogo,
    ],
    description: `Built a fully functional survey platform for a Philosophy course research project, 
        responsible for the entire development lifecycle. Focused on delivering an 
        intuitive survey experience for participants while ensuring clean data capture 
        in Supabase. Deepened my understanding of PostgreSQL Row-Level Security policies 
        and data visualization with shadcn/ui charts.`,
    link: 'https://phil331.vercel.app',
    github_link: 'https://github.com/rinmeng/phil331',
  },

  {
    title: 'PC8TH',
    images: [PC8TH],
    stacks: [
      HTML5Logo,
      CSS3Logo,
      TailwindCSSLogo,
      NodeJSLogo,
      JavaScriptLogo,
      ExpressLogo,
      MySQLLogo,
      DockerLogo,
    ],
    description: `A full-featured PC parts e-commerce platform built with a partner as an 
      introduction to backend development. Implemented product listings, cart 
      functionality, and a MySQL database layer through a Node.js/Express API — 
      all containerized with Docker. The project received an honorable mention 
      from the course professor for its execution and depth.`,
    github_link: 'https://github.com/rinmeng/pc8th',
  },
  {
    title: 'hikelowna',
    images: [HIKELOWNA],
    stacks: [JavaLogo, AndroidStudioLogo, FirebaseLogo],
    description: `A hiking trail management app for the Kelowna area, developed as a team for 
        an Android development course. My first foray into mobile development, where 
        I learned how to build and structure Android applications in Java, integrate 
        real-time data with Firebase, and collaborate effectively on a shared codebase 
        for a platform entirely new to me.`,
    github_link: 'https://github.com/rinmeng/hikelowna',
  },
];
