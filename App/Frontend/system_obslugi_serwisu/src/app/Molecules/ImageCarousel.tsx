import Image from "next/image";
import Image2 from "@/app/Molecules/Image";
import DialogWindow from "@/app/Molecules/DialogWindow";

export type ImageProps = {
    smallSrc: string;
    biggerSrc: string;
}

export type ImageCorouselProps = {
    images: ImageProps[];
}

export function ImageCarousel({images}:ImageCorouselProps) {
    return(
        <div className="flex flex-row gap-5 w-full overflow-x-auto">
            {images.map((image, index) => (
                <DialogWindow.Root key={index}>
                    <DialogWindow.Trigger asChild>
                        <Image className={`rounded-md flex-shrink-0 h-48 w-48 cursor-pointer`}
                               width={200}
                               height={200}
                               src={image.smallSrc}
                               alt=""/>
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