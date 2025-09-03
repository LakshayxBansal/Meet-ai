"use client";

import {ColumnDef} from "@tanstack/react-table";

export type Payment = {
    id: string;
    amount: number;
    status: "processing" | "pending" | "failed" | "success";
    email: string;
}

export const columns: ColumnDef<Payment>[] = [
    { accessorKey: "status", header: "Status" },
    { accessorKey: "email", header: "Email" },
    { accessorKey: "amount", header: "Amount" },
    // { accessorKey: "id", header: "ID" },
];