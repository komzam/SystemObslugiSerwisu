import {LuTrash2} from "react-icons/lu";

export type NoteItemProps = {
    id: string;
    content: string;
    author: string;
    createdAt: Date;
    onDelete: (id: string) => void;
}

export function NoteItem({ id, content, author, createdAt, onDelete }: NoteItemProps) {
    return (
        <div className="bg-accent2 rounded-md p-3 text-sm relative group pr-10">
            <p className="mb-1 wrap-anywhere">
                {content}
            </p>
            <p className="text-accent4 text-smaller1">
                {author}, {createdAt.toLocaleString()}
            </p>

            <button
                onClick={() => onDelete(id)}
                className="absolute top-3 right-3 text-red-500 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:text-red-700"
                title="Delete note"
            >
                <LuTrash2 size={18} />
            </button>
        </div>
    );
}