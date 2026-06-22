export function SinoProductDetails({ html }: { html: string }) {
  return (
    <section
      className="sino-product-details px-5 py-6 md:px-8"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
