"use client"

import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import React, { ReactNode } from "react";
import { useRouter } from "next/navigation";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface ConfirmActionDialogProps {
  title: string;
  description: string;
  confirmLabel: string;
  cancelLabel: string | "Cancel";
  goTo?: string; // Optional redirect
  onConfirm?: () => void; // Optional action handler
  actionType?: "delete" | "default"; // Determine button styles
  trigger: ReactNode; // Trigger element passed as a child
  isPending?: boolean;
  pendingText?: string;
}

export const ConfirmActionDialog: React.FC<ConfirmActionDialogProps> = ({
  title,
  description,
  confirmLabel,
  cancelLabel,
  goTo,
  onConfirm,
  actionType = "default", // default actionType
  trigger,
  isPending,
  pendingText = false
}) => {
  const router = useRouter();

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm(); 
    }
    if (goTo) {
      router.push(goTo);
    }
  };

  const confirmButtonClass =
    actionType === "delete" ? "bg-rose-500 hover:bg-rose-600" : "bg-primary hover:bg-primary-dark";

  return (
    <AlertDialog>
    <AlertDialogTrigger>{trigger}</AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>{title}</AlertDialogTitle>
        <AlertDialogDescription>
         {description}
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction onClick={handleConfirm}>{isPending ? pendingText : confirmLabel}</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>

    // <Dialog>
    //   <DialogTrigger asChild></DialogTrigger>
    //   <DialogContent>
    //     <DialogHeader>
    //       <DialogTitle className="text-sm"></DialogTitle>
    //       <DialogDescription className="text-xl text-gray-900"></DialogDescription>
    //     </DialogHeader>
    //     <DialogFooter className="flex justify-end gap-4">
    //       <Button variant="outline">{cancelLabel}</Button>
    //       <Button
    //         className={confirmButtonClass}
    //         onClick={handleConfirm}
    //       >
            
    //       </Button>
    //     </DialogFooter>
    //   </DialogContent>
    // </Dialog>
  );
};
