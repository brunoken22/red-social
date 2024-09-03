export default function linkify(text: string) {
  const urlPattern =
    /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;

  const parts = text.split(urlPattern);

  return (
    <>
      {parts.map((part, index) => {
        console.log(part);

        if (urlPattern.test(part)) {
          const domainName = part.replace(/(^\w+:|^)\/\//, '').split('/')[0];
          return (
            <a
              key={index}
              href={part}
              target='_blank'
              rel='noopener noreferrer'
              className='text-[rgb(59_184_246/87%)] hover:opacity-60'>
              {domainName}
            </a>
          );
        } else {
          return <span key={index}>{part == 'https' ? '' : part}</span>;
        }
      })}
    </>
  );
}
