import Image from "next/image";
import DialogWindow from "@/components/Molecules/DialogWindow";
import {LuX} from "react-icons/lu";
import * as React from "react";

export type ImageProps = {
    id: string;
    smallSrc: string;
    biggerSrc: string;
}

export type ImageCarouselProps = {
    images: ImageProps[];
    editable?: boolean;
    onDelete?: (id: string) => void;
}

export function ImageCarousel({images, editable=false, onDelete}:ImageCarouselProps) {
    const onDeleteClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id:string) =>{
        e.stopPropagation();
        e.preventDefault();
        onDelete?.(id);
    }

    return(
        <div className="flex flex-row gap-5 w-full overflow-x-auto">
            {images.map((image, index) => (
                <DialogWindow.Root key={index}>
                    <DialogWindow.Trigger asChild>
                        <div className="group relative flex-shrink-0 h-48 w-48">
                            <Image className={`rounded-md flex-shrink-0 h-48 w-48 cursor-pointer`}
                                   width={200}
                                   height={200}
                                   src={image.smallSrc}
                                   alt=""/>
                            {editable && <button onClick={(e) => onDeleteClick(e, image.id)}
                                    className="absolute opacity-0 group-hover:opacity-100 transition-all top-1 right-1 bg-red-500 hover:bg-red-600 duration-200 rounded-full">
                                {<LuX size="2rem" color="white"/>}
                            </button>}
                        </div>
                    </DialogWindow.Trigger>
                    <DialogWindow.Window className="!p-8" aria-describedby={undefined}>
                        <DialogWindow.Title></DialogWindow.Title>
                        <Image className="rounded-md flex-shrink-0 w-auto h-auto max-w-[80vw] max-h-[80vh] md:max-w-[90vw] md:max-h-[90vh]"
                               src={image.biggerSrc}
                               width={1920}
                               height={1080}
                               alt=""/>
                    </DialogWindow.Window>
                </DialogWindow.Root>
            ))}
        </div>
    )
}