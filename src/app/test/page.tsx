"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generateImage = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setError("");
    setImageUrl("");

    try {
      const response = await fetch("/api/v1", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();

      console.log(data, "DATA???");

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate image");
      }

      setImageUrl(data.image);
    } catch (err) {
      setError((err as Error).message || "Failed to generate image");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-2xl p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            AI Image Generator for NFTs
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Input
              type="text"
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
              placeholder="Enter image prompt (e.g., 'A futuristic NFT artwork')"
              className="w-full"
            />
            <Button
              onClick={generateImage}
              disabled={loading || !prompt.trim()}
              className="w-full"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                "Generate Image"
              )}
            </Button>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {imageUrl && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Generated Image</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center">
                  <Image
                    src={imageUrl || "/placeholder.svg"}
                    alt="Generated NFT"
                    width={512}
                    height={512}
                    className="rounded-lg shadow-lg"
                    crossOrigin="anonymous"
                  />
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
