"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { addVideo, resetAddVideoState } from "@/redux/addVideoSlice";
import { useEffect } from "react";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  tags: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function CreateVideoPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { status } = useAppSelector((state) => state.addVideo);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    if (status === "succeeded") {
      router.push("/");
      dispatch(resetAddVideoState());
    }
    if (status === "failed") {
      // TODO: add error handling here
    }
  }, [status, dispatch, router]);

  const onSubmit = async (data: FormValues) => {
    dispatch(
      addVideo({
        title: data.title,
        tags: data.tags?.split(",").map((tag) => tag.trim()) ?? [],
      })
    );
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">Add New Video</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <Label htmlFor="title" className="pb-2">
            Title
          </Label>
          <Input id="title" {...register("title")} />
          {errors.title && (
            <p className="text-sm text-red-500">{errors.title.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="tags" className="pb-2">
            Tags (comma-separated)
          </Label>
          <Input id="tags" {...register("tags")} />
        </div>

        <div className="flex justify-end gap-2">
          <Button
            type="button"
            variant="secondary"
            onClick={() => router.back()}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create"}
          </Button>
        </div>
      </form>
    </div>
  );
}
