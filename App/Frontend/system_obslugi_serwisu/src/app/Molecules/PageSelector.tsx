import React from "react";
import {Button} from "@/app/Atoms/Button";
import { LuChevronLeft, LuChevronRight, LuChevronFirst, LuChevronLast  } from "react-icons/lu";


type PageSelectorProps = {
    totalPages: number;
    currentPage?: number;
    onPageChange: (page: number) => void;
    showPrevNext?: boolean;
    showFirstLast?: boolean;
};


export function PageSelector({ totalPages, currentPage = 5, onPageChange, showPrevNext = true, showFirstLast = false }: PageSelectorProps) {
    if (totalPages <= 1) return null;

    const pages: (number | string)[] = [];
    const maxVisiblePages = 2;
    const half = Math.floor(maxVisiblePages / 2);
    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, currentPage + half);

    const goToPage = (page: number) => {
        const p = Math.max(1, Math.min(totalPages, page));
        if (p !== currentPage) onPageChange(p);
    };


    //Check if selected interval is smaller than wanted visible pages
    if (end - start + 1 < maxVisiblePages) {
        //If its beginning display all maxVisiblePages pages from start
        if (start === 1) end = Math.min(totalPages, start + maxVisiblePages - 1);
        //If its end display all maxVisiblePages pages from end
        else if (end === totalPages) start = Math.max(1, end - maxVisiblePages + 1);
    }


    if (start > 1) {
        pages.push(1);
        if (start > 2) pages.push("…");
    }


    for (let i = start; i <= end; i++) pages.push(i);


    if (end < totalPages) {
        if (end < totalPages - 1) pages.push("…");
        pages.push(totalPages);
    }


    return (
        <div className="flex flex-row items-center gap-1">
            {showFirstLast && (
                <Button
                    className="!p-2"
                    onClick={() => goToPage(1)}
                    disabled={currentPage === 1}
                    icon={<LuChevronFirst size="16px"/>}
                />
            )}


            {showPrevNext && (
                <Button
                    className="!p-2"
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    icon={<LuChevronLeft size="16px"/>}
                />
            )}


            {pages.map((p, idx) =>
                typeof p === "number" ? (
                    <Button
                        className="!px-2 !py-1"
                        key={idx}
                        variant={currentPage==p ? "secondary" : "primary"}
                        onClick={() => goToPage(p)}
                    >
                        {p}
                    </Button>
                ) : (
                    <span key={idx}>{p}</span>
                )
            )}


            {showPrevNext && (
                <Button
                    className="!p-2"
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    icon={<LuChevronRight/>}
                />
            )}


            {showFirstLast && (
                <Button
                    className="!p-2"
                    onClick={() => goToPage(totalPages)}
                    disabled={currentPage === totalPages}
                    icon={<LuChevronLast/>}
                />
            )}
        </div>
    );
}