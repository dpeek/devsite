import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import {
  FileText,
  GithubIcon,
  LaptopIcon,
  LinkedinIcon,
  MailIcon,
  PhoneIcon,
  TwitterIcon,
} from "lucide-react";
import { useState } from "react";
import { trpc } from "./trpc";

const API_URL = "http://127.0.0.1:8788";

const links = [
  "https://dpeek.com/resume.pdf",
  "https://dpeek.com",
  "https://github.com/dpeek",
  "https://twitter.com/dpeek_",
  "mailto:mail@dpeek.com",
  "tel:+61412345678",
  "https://www.linkedin.com/in/dapeek",
];

function getConfig(href: string) {
  if (href.includes(".pdf")) {
    return {
      icon: <FileText />,
      title: "Read offline",
    };
  }
  if (href.includes("github.com")) {
    return {
      icon: <GithubIcon />,
      title: "Judge me",
    };
  }
  if (href.includes("twitter.com")) {
    return {
      icon: <TwitterIcon />,
      title: "Follow me",
    };
  }
  if (href.includes("mailto:")) {
    return {
      icon: <MailIcon />,
      title: "Email me",
    };
  }
  if (href.includes("tel:")) {
    return {
      icon: <PhoneIcon />,
      title: "Call me",
    };
  }
  if (href.includes("linkedin.com")) {
    return {
      icon: <LinkedinIcon />,
      title: "Hire me",
    };
  }
  return {
    icon: <LaptopIcon />,
    title: "Read online",
  };
}

function Link({ href }: { href: string }) {}

function RootLayout() {
  return (
    <div className="flex flex-col gap-4 relative h-full">
      <div className="flex print:flex-col">
        {links.map((href, index) => {
          const config = getConfig(href);
          return (
            <a
              key={index}
              href={href}
              title={config.title}
              className="flex gap-2 p-2 hover:bg-slate-200 rounded-full transition-all"
            >
              {config.icon}
              <span className="hidden print:block">{href}</span>
            </a>
          );
        })}
      </div>
      {/* <Editor /> */}
    </div>
  );
}

export default function App() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: `${API_URL}/trpc`,
        }),
      ],
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <RootLayout />
      </QueryClientProvider>
    </trpc.Provider>
  );
}
