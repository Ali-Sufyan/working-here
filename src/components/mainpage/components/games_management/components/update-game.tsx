/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import MultipleSelector from "@/components/ui/multi-select";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, X } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";

// Predefined lists for selects
const GENRES = ["Action", "Adventure", "RPG", "Strategy", "Simulation"];
const FEATURES = ["Multiplayer", "Co-op", "Cross-Platform"];
const CONTENT_WARNINGS = ["Violence", "Sexual Content", "Language"];
const AGE_RATINGS = ["E (Everyone)", "T (Teen)", "M (Mature)"];

// Zod validation schema
const gameUpdateSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  shortDescription: z.string().optional(),
  status: z.enum(["draft", "published", "in-review"]),
  genres: z.array(z.string()).min(1, "Select at least one genre"),
  features: z.array(z.string()).optional(),
  ageRating: z.string(),
  contentWarnings: z.array(z.string()).optional(),
  releaseDate: z.date().optional(),
  socialLinks: z.object({
    discord: z.string().url("Invalid Discord URL").optional(),
    twitter: z.string().url("Invalid Twitter URL").optional(),
    facebook: z.string().url("Invalid Facebook URL").optional(),
    youtube: z.string().url("Invalid YouTube URL").optional(),
    twitch: z.string().url("Invalid Twitch URL").optional(),
  }).optional(),
});



const GameUpdateModal = ({ onClose, gameData }: {onClose: () => void, gameData: any}
    
) => {
  const form = useForm({
    resolver: zodResolver(gameUpdateSchema),
    defaultValues: {
      title: gameData.title || "",
      description: gameData.description || "",
      shortDescription: gameData.shortDescription || "",
      status: gameData.status || "draft",
      genres: gameData.genres || [],
      tags: gameData.tags || [],
      features: gameData.features || [],
      ageRating: gameData.ageRating || "E (Everyone)",
      contentWarnings: gameData.contentWarnings || [],
      releaseDate: gameData.releaseDate
        ? new Date(gameData.releaseDate)
        : undefined,
      socialLinks: gameData.socialLinks || {},
    },
  });

  const onSubmit = (data:any) => {
    console.log("Updated Game Data:", data);
    // Here you would typically dispatch an action to update the game
    // dispatch(updateGameAction(data));
    onClose();
  };

  return (
    <div className="">
      <section className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <div>
          <div>Update Game Details</div>
          <div>
            Make changes to your game information. Click save when you're done.
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Basic Information */}
            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Game Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter game title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="published">Published</SelectItem>
                        <SelectItem value="in-review">In Review</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Descriptions */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your game"
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Categorization */}
            <div className="grid md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="genres"
                render={({ field }) => (
                  <FormItem>
                        <FormLabel>Genres</FormLabel>
                        
                    <MultipleSelector

                            defaultOptions={GENRES.map((genre) => ({ label: genre, value: genre }))}
                    {...field}
                    
                      
                        />
                    <FormMessage />
                  </FormItem>
                )}
              />


              <FormField
                control={form.control}
                name="ageRating"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Age Rating</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select age rating" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {AGE_RATINGS.map((rating) => (
                          <SelectItem key={rating} value={rating}>
                            {rating}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Additional Details */}
            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="features"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Features</FormLabel>
                    <MultipleSelector
                    {...field}
                        
                            defaultOptions={FEATURES.map((feature) => ({ label: feature, value: feature }))}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="contentWarnings"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content Warnings</FormLabel>
                    <MultipleSelector
                    {...field}
                        
                            defaultOptions={CONTENT_WARNINGS.map((warning) => ({ label: warning, value: warning }))}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* Social Links Section */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4">Social Links</h3>
              <div className="grid md:grid-cols-3 gap-4">
                {Object.keys(gameData.socialLinks).map((platform) => (
                  <FormField
                    key={platform}
                    control={form.control}
                    name={`socialLinks.${platform}`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {platform.charAt(0).toUpperCase() + platform.slice(1)}{" "}
                          Link
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder={`Enter ${platform} URL`}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
              </div>
            </div>

            {/* Release Date */}
            <FormField
              control={form.control}
              name="releaseDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Release Date</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      value={
                        field.value
                          ? field.value.toISOString().split("T")[0]
                          : ""
                      }
                      onChange={(e) => field.onChange(new Date(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Dialog Footer with Action Buttons */}
            <div className="flex justify-between items-center">
              <div >
                <Button type="button" variant="outline">
                  <X className="mr-2 h-4 w-4" /> Cancel
                </Button>
              </div>
              <Button type="submit">
                <Check className="mr-2 h-4 w-4" /> Save Changes
              </Button>
            </div>
          </form>
        </Form>
      </section>
    </div>
  );
};

export default GameUpdateModal;
