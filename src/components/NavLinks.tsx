// export const instant = false ;
import Link from "next/link";

const Navlinks = async () => {
    const res = await fetch("https://api.api-store.workers.dev/api/bazardor/categories", {cache : "force-cache"});
    const data = await res.json() ;
    // const category = data.data ;
    // console.log(data) ;
    return (
        <div className="container mx-auto py-4 pl-4.5 flex gap-8 text-[12px]">
            {data?.map((cat:any, id: number)=> <Link href={'/'} key={id}>{cat.icon}{cat.nameBn}</Link>)}
        </div>
    );
};

export default Navlinks;