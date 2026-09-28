import {
 LucideIcon
} from "lucide-react"


interface Props {
 title:string
 value:string
 icon:LucideIcon
 description:string
}


export default function StatCard({
 title,
 value,
 icon:Icon,
 description
}:Props){

return (

<div className="
 rounded-2xl
 bg-white
 border
 shadow-sm
 p-5
 hover:shadow-md
 transition
">

<div className="flex justify-between items-start">


<div>

<p className="
text-sm 
text-slate-500
">
{title}
</p>


<h2 className="
text-3xl
font-bold
mt-2
">
{value}
</h2>


<p className="
text-xs
text-slate-400
mt-2
">
{description}
</p>

</div>


<div className="
bg-green-100
text-green-600
p-3
rounded-xl
">

<Icon size={24}/>

</div>


</div>


</div>

)

}