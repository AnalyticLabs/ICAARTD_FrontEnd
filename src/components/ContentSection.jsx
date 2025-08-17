export default function ContentSection({ title, children }) {
  return (
    <div className="pt-6 md:pt-12 px-6 md:px-12">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="text-gray-700 text-sm leading-relaxed">{children}</div>
    </div>
  );
}
