import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="h-screen">
     <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent className="rounded-[15px]">
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="blueberry">Blueberry</SelectItem>
          <SelectItem value="grapes">Grapes</SelectItem>
          <SelectItem value="pineapple">Pineapple</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
    <Popover className="absolute top-0 right-0">
      <PopoverTrigger asChild>
        <Button variant="outline" className="rounded-full" size="icon" >l</Button>
      </PopoverTrigger>
      <PopoverContent  className="w-fit p-0 rounded-xl">
        <div className="w-[150px] p-2 ">
          <ul>
            <li className="w-full p-2 hover:bg-gradient-to-br from-white to-blue-400 from-20% rounded-[10px]">login</li>
            <li className="w-full p-2 hover:bg-gradient-to-br from-white to-blue-400 from-20% rounded-[10px]">login</li>

            
          </ul>
        </div>
      </PopoverContent>
    </Popover>
    </main>
  );
}
