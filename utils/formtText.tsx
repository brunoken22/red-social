import Link from "next/link";

export default function Linkify({ text }: { text: string }) {
  const urlPattern = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;

  const parts = text.split(urlPattern);

  return (
    <>
      {parts.map((part, index) => {
        if (urlPattern.test(part)) {
          const domainName = part.replace(/(^\w+:|^)\/\//, "").split("/")[0];
          return (
            <Link
              key={index}
              href={part}
              target='_blank'
              style={{ color: "#ff6c00", textDecoration: "underline" }}
              className='text-[#ff6c00] font-normal  hover:opacity-80'
            >
              {domainName}
            </Link>
          );
        } else {
          return <span key={index}>{part == "https" ? "" : part}</span>;
        }
      })}
    </>
  );
}
