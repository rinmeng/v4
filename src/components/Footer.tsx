import rmlogo from "@/assets/rmlogov2.png";
import web8th from "@/assets/logo_white_svg_600px.svg";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

export default function Footer() {
  const getYear = () => {
    const date = new Date();
    return date.getFullYear();
  };
  return (
    <>
      <div className="border-b w-full border-dashed"></div>
      <Card className="text-center rounded-none border-y-0 border-x shadow-none container mx-auto gap-4">
        <CardHeader>
          <CardTitle className="flex justify-center items-center gap-2">
            &copy; {getYear()} rin meng
            <span>
              <Image
                src={rmlogo}
                alt="rmlogo"
                className="w-12 h-auto mx-1 not-dark:invert-100"
              />
            </span>
          </CardTitle>
          <CardDescription className="text-lg"></CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-sm flex items-center justify-center">
            <span>
              <a href="https://web8th.com" target="_blank" rel="noreferrer">
                <Image
                  src={web8th}
                  alt="web8th"
                  className="w-64 h-auto not-dark:invert-100"
                />
              </a>
            </span>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
