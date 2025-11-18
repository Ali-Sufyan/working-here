import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dropdown } from "@/components/ui/dropdown";
import { FileUpload } from "@/components/ui/file-upload";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from "@/components/ui/table";
import Label from "@/components/utilities/styles/label";
import { useEffect, useState } from "react";

const MarketingAndPromotionUI = () => {
  const [bannerImage, setBannerImage] = useState<File | null>(null);
  const [promoCode, setPromoCode] = useState("");
  const [featuredSlot, setFeaturedSlot] = useState(0);
  const [crossPromotionGame, setCrossPromotionGame] = useState("");

  const [marketingMaterials, setMarketingMaterials] = useState<File[]>([]);
  const [screenshots, setScreenshots] = useState<File[]>([]);
  const [trailers, setTrailers] = useState<File[]>([]);
  const [pressKits, setPressKits] = useState<File[]>([]);

  useEffect(() => {
    // Fetch real-time data from an API
    const fetchData = async () => {
      const materialsResponse = await fetch("/api/marketing-materials");
      const materialsData = await materialsResponse.json();
      setMarketingMaterials(materialsData.files);

      const screenshotsResponse = await fetch("/api/game-screenshots");
      const screenshotsData = await screenshotsResponse.json();
      setScreenshots(screenshotsData.files);

      const trailersResponse = await fetch("/api/game-trailers");
      const trailersData = await trailersResponse.json();
      setTrailers(trailersData.files);

      const pressKitsResponse = await fetch("/api/press-kits");
      const pressKitsData = await pressKitsResponse.json();
      setPressKits(pressKitsData.files);
    };

    fetchData();
  }, []);

  const handleBannerUpload = (files: File[]) => {
      setBannerImage(files[0] || null);
  };

  const handlePromoCodeGeneration = () => {
    // Generate a new promo code and update the state
    const newPromoCode =
      "PROMO-" + Math.random().toString(36).substring(2, 8).toUpperCase();
    setPromoCode(newPromoCode);
  };

  const handleFeaturedSlotAssignment = () => {
    // Assign the game to a featured slot and update the state
    setFeaturedSlot(featuredSlot + 1);
  };

  const handleCrossPromotion = () => {
    // Initiate cross-promotion with the selected game and update the state
    setCrossPromotionGame("Another Game");
  };

  const handleAssetUpload = (
    type: "marketing" | "screenshots" | "trailers" | "pressKits",
    files: File[]
  ) => {
    switch (type) {
      case "marketing":
        setMarketingMaterials(files);
        break;
      case "screenshots":
        setScreenshots(files);
        break;
      case "trailers":
        setTrailers(files);
        break;
      case "pressKits":
        setPressKits(files);
        break;
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Marketing & Promotion</h1>

      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-8">
        <Card className="px-8 mx-5">
          <CardHeader>
            <CardTitle>Promotion Tools</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <h3 className="text-lg font-medium mb-2">Banner Creation</h3>
              <FileUpload
                label="Upload Banner Image"
                files={bannerImage ? [bannerImage] : []}
                onFilesChange={handleBannerUpload}
              />
            </div>
            <div className="mb-4">
              <h3 className="text-lg font-medium mb-2">Promotional Codes</h3>
              <Label htmlFor="Promo Code">Promo Code</Label>

              <Input id="Promo Code" value={promoCode} readOnly />

              <Button className="mt-2" onClick={handlePromoCodeGeneration}>
                Generate Promo Code
              </Button>
            </div>
            <div className="mb-4">
              <h3 className="text-lg font-medium mb-2">Featured Slots</h3>
              <Dropdown
                label="Featured Slot"
                value={featuredSlot}
                onChange={(e) => setFeaturedSlot(parseInt(e))}
                options={[1, 2, 3, 4, 5]}
              />
              <Button className="mt-2" onClick={handleFeaturedSlotAssignment}>
                Assign to Featured Slot
              </Button>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Cross-Promotion</h3>
              <Label htmlFor="Cross-Promote With">Cross-Promote With</Label>
              <Input
                id="Cross-Promote With"
                value={crossPromotionGame}
                readOnly
              />
              <Button className="mt-2" onClick={handleCrossPromotion}>
                Initiate Cross-Promotion
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="px-8 mx-5">
          <CardHeader>
            <CardTitle>Asset Management</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <h3 className="text-lg font-medium mb-2">Marketing Materials</h3>
              <FileUpload
                label="Upload Marketing Assets"
                files={marketingMaterials}
                onFilesChange={(files) => handleAssetUpload("marketing", files)}
              />
            </div>
            <div className="mb-4">
              <h3 className="text-lg font-medium mb-2">Screenshots</h3>
              <FileUpload
                label="Upload Screenshots"
                files={screenshots}
                onFilesChange={(files) =>
                  handleAssetUpload("screenshots", files)
                }
              />
            </div>
            <div className="mb-4">
              <h3 className="text-lg font-medium mb-2">Trailers</h3>
              <FileUpload
                label="Upload Trailers"
                files={trailers}
                onFilesChange={(files) => handleAssetUpload("trailers", files)}
              />
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Press Kits</h3>
              <FileUpload
                label="Upload Press Kits"
                files={pressKits}
                onFilesChange={(files) => handleAssetUpload("pressKits", files)}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="px-8 mx-5">
          <CardHeader>
            <CardTitle>Asset Library</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Type</TableCell>
                  <TableCell>Preview</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Marketing Materials</TableCell>
                  <TableCell>
                    {marketingMaterials.length > 0 && (
                      <img
                        src={URL.createObjectURL(marketingMaterials[0])}
                        alt="Marketing Material"
                        className="w-32 h-24 object-cover"
                      />
                    )}
                  </TableCell>
                  <TableCell>
                    <Button>View</Button>
                    <Button className="ml-2">Download</Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Screenshots</TableCell>
                  <TableCell>
                    {screenshots.length > 0 && (
                      <img
                        src={URL.createObjectURL(screenshots[0])}
                        alt="Screenshot"
                        className="w-32 h-24 object-cover"
                      />
                    )}
                  </TableCell>
                  <TableCell>
                    <Button>View</Button>
                    <Button className="ml-2">Download</Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Trailers</TableCell>
                  <TableCell>
                    {trailers.length > 0 && (
                      <video
                        src={URL.createObjectURL(trailers[0])}
                        controls
                        className="w-32 h-24 object-cover"
                      />
                    )}
                  </TableCell>
                  <TableCell>
                    <Button>View</Button>
                    <Button className="ml-2">Download</Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Press Kits</TableCell>
                  <TableCell>
                    {pressKits.length > 0 && (
                      <img
                        src={URL.createObjectURL(pressKits[0])}
                        alt="Press Kit"
                        className="w-32 h-24 object-cover"
                      />
                    )}
                  </TableCell>
                  <TableCell>
                    <Button>View</Button>
                    <Button className="ml-2">Download</Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MarketingAndPromotionUI;
