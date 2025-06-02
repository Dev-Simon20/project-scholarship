import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

const SocialWorkersPage = () => {
  return (
    <div className="container outline">
      <article className="flex">
        <section className="relative ">
          <Search size={20} className="absolute  top-1/2 -translate-y-1/2 left-3"/>
          <Input placeholder="Filtrar por nombre, estado " className="pl-10"/>
        </section>
        <section></section>
      </article>
    </div>
  )
}
export default SocialWorkersPage