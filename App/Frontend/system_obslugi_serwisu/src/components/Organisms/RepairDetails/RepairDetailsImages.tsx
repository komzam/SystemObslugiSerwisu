import {Card} from "@/components/Atoms/Card";
import {useTranslations} from "next-intl";
import {ImageCarousel, ImageProps} from "@/components/Molecules/ImageCarousel";
import {GetRepairImagesQuery, GetRepairQuery} from "@/__generated__/types";
import {ChangeEvent, FormEventHandler, ReactNode, useState} from "react";
import {Button} from "@/components/Atoms/Button";
import DialogWindow from "@/components/Molecules/DialogWindow";
import {TextInput} from "@/components/Atoms/TextInput";
import {useToast} from "@/components/Utils/ToastNotifications";

export type RepairDetailsImagesProps = {
    images: GetRepairImagesQuery["repair"]["images"];
}

export function RepairDetailsImages({images}: RepairDetailsImagesProps) {
    return (
        <RepairDetailsImages.Root>
            <RepairDetailsImages.ImageCarousel images={images}/>
        </RepairDetailsImages.Root>
    )
}

type RootProps = {
    children: ReactNode;
    editable?: boolean;
    getUploadLink?: (contentType: string) => Promise<string|null>;
    onUploadSuccess?: () => void;
};
RepairDetailsImages.Root = ({children, editable, getUploadLink, onUploadSuccess} : RootProps) => {
    const t = useTranslations("RepairDetails");
    const tComm = useTranslations("Common");
    const tErr = useTranslations("Errors");
    const toasts = useToast();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    const handleFileChange = (e : ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setSelectedFile(file);
        }
    }

    const handleConfirm = async () => {
        if (!selectedFile) return;

        try {
            setIsUploading(true);

            if(getUploadLink == null) throw new Error();

            const destinationUrl = await getUploadLink(selectedFile.type);
            if(destinationUrl == null){
                setIsUploading(false);
                return;
            }

            const response = await fetch(destinationUrl, {
                method: "PUT",
                body: selectedFile,
                headers: {
                    "Content-Type": selectedFile.type
                }
            });

            if (!response.ok) throw new Error();

            setSelectedFile(null);
            onUploadSuccess?.();
        } catch (error) {
            toasts.toast({type:"error", title:tErr("error"), description:tErr("generalError")});
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <Card className={"w-0 min-w-full"}>
            <div className={`grid ${editable? "grid-cols-[1fr_auto] mb-3": "grid-cols-1"}`}>
                <Card.Label>{t("images")}</Card.Label>
                {editable &&
                    <DialogWindow.Root onOpenChange={(open) => !open && setSelectedFile(null)}>
                        <DialogWindow.Trigger asChild>
                            <Button>{t("addImage")}</Button>
                        </DialogWindow.Trigger>

                        <DialogWindow.Window aria-describedby={undefined}>
                            <DialogWindow.Title>{t("addImage")}</DialogWindow.Title>
                            <DialogWindow.Close/>
                            <div className="flex flex-col gap-6">
                                <TextInput
                                    type="file"
                                    accept="image/*"
                                    className="file:border-0 file:bg-transparent file:text-sm file:font-medium"
                                    onInput={handleFileChange}
                                />

                                <div className="flex flex-row justify-end gap-3 w-full">
                                    <DialogWindow.Close asChild>
                                        <Button type="button" variant="secondary" disabled={isUploading}>
                                            {tComm("cancel")}
                                        </Button>
                                    </DialogWindow.Close>
                                    <DialogWindow.Close asChild>
                                        <Button onClick={handleConfirm}
                                                disabled={!selectedFile || isUploading}>
                                            {isUploading ? tComm("uploading") : tComm("confirm")}
                                        </Button>
                                    </DialogWindow.Close>
                                </div>
                            </div>
                        </DialogWindow.Window>
                    </DialogWindow.Root>
                }
            </div>
            {children}
        </Card>
    );
};

type ImageCarouselProps = {
    images: GetRepairImagesQuery["repair"]["images"];
    editable?: boolean;
    onDelete?: (id: string) => void;
}
RepairDetailsImages.ImageCarousel = ({images, editable=false, onDelete} : ImageCarouselProps) => {
    const t = useTranslations("RepairDetails");
    const imageList:ImageProps[] =[];
    for(const image of images){
        imageList.push({
            id: image.id,
            smallSrc:image.small,
            biggerSrc:image.extraLarge
        });
    }

    return imageList.length>0 ?
        <ImageCarousel images={imageList} editable={editable} onDelete={onDelete}/>:
        <div className="h-48 w-full flex justify-center items-center">
            <p className="text-center text-larger2 text-accent4 font-bold">{t("noImages")}</p>
        </div>;
}