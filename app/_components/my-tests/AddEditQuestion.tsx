"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { QuestionSchema } from "@/app/_schemas";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckSquareIcon, Delete, Trash, Trash2 } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import {
  useAddEditQuestionMutation,
  useDeleteQuestionMutation,
} from "@/app/_dataOperations/mutations/mutations";
import { Question } from "@/app/_types";
import { toast } from "react-toastify";

interface AddEditQuestionProps {
  question?: Question;
  action: string;
  number?: number;
}

const AddEditQuestion: React.FC<AddEditQuestionProps> = ({
  question,
  action,
  number,
}) => {
  const pathnameList = usePathname().split("/");
  const slug = pathnameList[2];

  const { mutate: addEditMutate, isPending } = useAddEditQuestionMutation();
  const { mutate: deleteMutate } = useDeleteQuestionMutation();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isDirty },
    setValue,
    resetField,
    watch,
    reset,
    trigger,
  } = useForm({
    resolver: zodResolver(QuestionSchema),
    defaultValues: question
      ? {
          testSlug: slug,
          id: question.id,
          question: question.question,
          options: question.options,
        }
      : {
          testSlug: slug,
          question: "",
          options: [
            { option: "", is_correct: false },
            { option: "", is_correct: false },
          ],
        },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "options",
  });

  const watchOptions = watch("options");

  const handleCorrectChange = (index: number) => {
    const updatedOptions = watchOptions.map((option, i) => ({
      ...option,
      is_correct: i === index,
    }));
    setValue("options", updatedOptions, { shouldDirty: true });
    trigger("options");
  };

  const onSubmit = (formData: any) => {
    console.log(formData);
    addEditMutate(
      { data: formData, action: action },
      {
        onSuccess() {
          toast.success(
            action === "edit"
              ? "Question was updated"
              : "New Question was added"
          );
          if (action === "edit") {
            reset(formData);
          } else {
            reset({
              question: "",
              options: [
                { option: "", is_correct: false },
                { option: "", is_correct: false },
              ],
            });
          }
        },
      }
    );
    // Add your form submission logic here
  };

  const deleteQuestion = (id: any) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this question? "
    );
    if (confirmDelete) {
      deleteMutate(id);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`border border-zinc-300 focus:border-primary flex flex-col px-3 py-5 sm:p-10 rounded-md gap-5`}
        noValidate
      >
        {action === "edit" ? (
          <h1 className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-primary text-primary">
            {number}
          </h1>
        ) : (
          <h1 className="text-xl">Add a new question here</h1>
        )}
        <div className="flex items-start gap-10 flex-col lg:flex-row">
          <div className="flex-grow w-full lg:w-fit">
            <textarea
              className={`input`}
              {...register("question")}
              placeholder="Question"
            />
            {errors.question?.message && (
              <p className="text-[15px] text-destructive pl-2">
                {errors.question?.message as string}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-5 sm:w-[400px] w-full">
            {fields.map((field, index) => (
              <div key={field.id}>
                <div className="flex gap-2 items-center">
                  <input
                    type="radio"
                    id={`option-${field.id}`}
                    name="correctOption"
                    checked={watchOptions[index].is_correct}
                    onChange={() => handleCorrectChange(index)}
                    className="hidden peer"
                  />
                  <label
                    htmlFor={`option-${field.id}`}
                    className="flex items-center gap-2 text-sm cursor-pointer text-zinc-400 font-bold peer-checked:text-emerald-500"
                  >
                    <CheckSquareIcon className="font-bold" />
                  </label>
                  <div className="input-error-cont w-full" >
                    <input
                      type="text"
                      className={`input`}
                      placeholder={`Option ${index + 1}`}
                      {...register(`options.${index}.option` as const)}
                    />
                    {errors.options?.[index]?.option?.message && (
                      <p className="text-[15px] text-destructive pl-2">
                        {errors.options?.[index]?.option?.message as string}
                      </p>
                    )}
                  </div>
                  {index > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      className="self-start w-fit px-2 border-zinc-400 border-none text-red-400 bg-white hover:text-red-400 hover:bg-red-50"
                      onClick={() => {
                        remove([index]);
                      }}
                    >
                      <Trash2 />
                    </Button>
                  )}
                </div>
              </div>
            ))}

            <Button
              type="button"
              className="self-start w-fit px-6 border-zinc-300 bg-zinc-700 text-white hover:bg-zinc-700/90"
              onClick={() => append({ option: "", is_correct: false })}
            >
              Add New
            </Button>
          </div>
        </div>
        {question ? (
          <div className="flex gap-6 justify-end">
            <Button
              type="submit"
              className=" w-fit px-6 border-zinc-300 disabled:cursor-notallowed bg-emerald-500 text-white hover:bg-emerald-500/90"
              disabled={!isDirty}
            >
              Update
            </Button>
            <Button
              type="button"
              variant="destructive"
              className=" w-fit px-6 text-white"
              onClick={() => deleteQuestion(question.id)}
            >
              Delete
            </Button>
          </div>
        ) : (
          <Button
            type="submit"
            className="self-end w-fit px-6 border-zinc-300 bg-zinc-700 text-white hover:bg-zinc-700/90"
          >
            Add
          </Button>
        )}
      </form>
    </div>
  );
};

export default AddEditQuestion;
