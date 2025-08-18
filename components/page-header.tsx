interface PageHeaderProps {
  title: string
  description: string
}

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="bg-gradient-olive text-white text-center py-16 mb-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">{title}</h1>
        <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">{description}</p>
      </div>
    </div>
  )
}
