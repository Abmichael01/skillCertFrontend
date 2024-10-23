"use client";

import React, { useState } from "react";
import Input from "../Input";
import { cn } from "@/lib/utils";
import {
  Select, 
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCategoriesQuery } from "@/app/_dataOperations/queries/queries";
import { Button } from "@/components/ui/button";
import { TestSchema } from "@/app/_schemas";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter, usePathname } from "next/navigation";
import { useUserStore } from "@/app/_stores";
import { useCreateEditTestMutation } from "@/app/_dataOperations/mutations/mutations";
import { Test } from "@/app/_types";

type FormData = z.infer<typeof TestSchema>;

interface CreateEditTestOverviewProps {
  test?: Test;
}

const CreateEditTestOverview: React.FC<CreateEditTestOverviewProps> = ({ test }) => {
  const { data } = useCategoriesQuery();
  const pathnameList = usePathname().split("/");
  const router = useRouter();
  const { user } = useUserStore();
  const { mutate, isPending, isSuccess } = useCreateEditTestMutation()
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<FormData>({
    resolver: zodResolver(TestSchema),
    defaultValues: test 
      ? {
        title: test.title,
        category: String(test.category),
        duration: test.duration,
        difficulty: test.difficulty,
        public: test.public ? "True" : "False",
      } : {  }
  });

  

  const onSubmit = (formData: FormData) => {
    console.log(formData);
    const data = {...formData, slug: test?.slug}
    mutate({data: data, action: pathnameList.includes("edit") ? "edit" : "create"}, {
      onSuccess: (data) => {
        const slug = pathnameList.includes("edit") ? test?.slug : data.slug
        router.push(`/my-tests/${slug}/edit?tab=questions`)
      }
    })
    
  };

  return (
    <div className="lg:">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-5 border border-zinc-300 p-4 md:p-10 :w-[85%]"
        noValidate
      >
        <h1 className="text-xl mb-5">Overview</h1>
        <hr />
        <div className="mb-4 flex flex-col gap-8 mt-5">
          <div className="input-container">
            <label htmlFor="title" className={`label`}>
              <h1>Test Title</h1>
              <p>
                Enter a descriptive title for your test. Keep it{" "}
                <strong>concise</strong> and <strong>relevant</strong> to the
                subject matter.
              </p>
            </label>
            <div className="input-error-cont">
              <textarea
                id="title"
                className={`input ${
                  errors.title?.message ? "border-destructive" : ""
                }`}
                placeholder="The Title goes here"
                {...register("title")}
              />
              {errors.title?.message && (
                <p className="text-[15px] text-destructive pl-2">
                  {errors.title?.message}
                </p>
              )}
            </div>
          </div>

          <div className="input-container">
            <label htmlFor="category" className={`label`}>
              <h1>Category</h1>
              <p>
                Select a category that best fits your test. This helps in{" "}
                <strong>organizing</strong> tests and making them{" "}
                <strong>easier</strong> to find later.
              </p>
            </label>

            <div className="input-error-cont">
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger id="category" className="input">
                      <SelectValue placeholder="--Select Category--" />
                    </SelectTrigger>
                    <SelectContent>
                      {data?.map((category) => (
                        <SelectItem
                          key={category.id}
                          value={String(category.id)}
                        >
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.category?.message && (
                <p className="text-[15px] text-destructive pl-2">
                  {errors.category?.message}
                </p>
              )}
            </div>
          </div>

          <div className="input-container">
            <label htmlFor="duration" className={`label`}>
              <h1>Duration</h1>
              <p>
                Specify the duration of the test in minutes. The{" "}
                <strong>minimum</strong> duration is <strong>5 minutes</strong>{" "}
                to ensure a meaningful assessment.
              </p>
            </label>

            <div className="input-error-cont">
              <input
                id="duration"
                type="number"
                className={`input ${
                  errors.duration?.message ? "border-destructive" : ""
                }`}
                placeholder="5 Minutes"
                {...register("duration", { valueAsNumber: true })}
              />
              {errors.duration?.message && (
                <p className="text-[15px] text-destructive pl-2">
                  {errors.duration?.message}
                </p>
              )}
            </div>
          </div>

          <div className="input-container">
            <label htmlFor="difficulty" className={`label`}>
              <h1>Difficulty</h1>
              <p>
                Select the difficulty level of the test. This helps{" "}
                <strong>categorize</strong> the test and{" "}
                <strong>sets expectations</strong> for participants.
              </p>
            </label>

            <div className="input-error-cont">
              <Controller
                name="difficulty"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger id="difficulty" className="input">
                      <SelectValue placeholder="--Select Difficulty--" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="S">Simple</SelectItem>
                      <SelectItem value="M">Moderate</SelectItem>
                      <SelectItem value="H">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.difficulty?.message && (
                <p className="text-[15px] text-destructive pl-2">
                  {errors.difficulty?.message}
                </p>
              )}
            </div>
          </div>

          <div className="input-container">
            <label htmlFor="public" className={`label`}>
              <h1>Privacy</h1>
              <p>
                Choose whether to make test <strong>public</strong> or {" "}
                <strong>Private</strong>.
              </p>
            </label>

            <div className="input-error-cont">
              <Controller
                name="public"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger id="public" className="input">
                      <SelectValue placeholder="--Select Privacy--" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="True">Public</SelectItem>
                      <SelectItem value="False">Private</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.public?.message && (
                <p className="text-[15px] text-destructive pl-2">
                  {errors.public?.message}
                </p>
              )}
            </div>
          </div>

          <Button
            type="submit"
            className="self-end w-fit px-6 border-zinc-300 bg-zinc-700 text-white hover:bg-zinc-700/90"
            disabled={!isDirty && pathnameList.includes("edit") || isPending }
          >
            {pathnameList.includes("edit") ? (
              <span>{isPending ? <span>Saving...</span> : <span>Save</span>}</span>
            ) : (
              <span>Next</span>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateEditTestOverview;
