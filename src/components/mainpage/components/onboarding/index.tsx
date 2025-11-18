import { useCreateDevFullProfileMutation } from "@/app/services/dev-profile/dev.profile.query";
import { IDevData } from "@/app/services/dev-profile/dev.profile.types";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SelectInput3 } from "@/components/utilities/forms/select";
import Loading from "@/components/utilities/styles/loading";
import { CheckCircle2, ChevronRight, Terminal } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { countryList } from "./country";


type TFormData = {
  companyName: string;
  website: string;
  bankInfo: {
    bankName: string;
    accountNumber: string;
    accountName: string;
    swiftCode: string;
  };
  taxInfo: {
    taxId: string;
    taxIdentificationType: string;
    taxCountry: string;
  };
  portfolioUrls: string[];
};
const DeveloperOnboarding = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();
  const [createDev, { isLoading, isError, isSuccess, error }] = useCreateDevFullProfileMutation()
  
  useEffect(() => {
    if (isSuccess) {
      toast.success("Application submitted successfully")
      // reload the page  
      window.location.reload()
      navigate('/')

    }
    if (isError) {
      toast.error("Error submitting application")
      console.log(error)
    }
  }, [isSuccess, isError, error, navigate])
  const [formData, setFormData] = useState<TFormData>({
    companyName: "",
    website: "",
    bankInfo: {
      bankName: "",
      accountNumber: "",
      accountName: "",
      swiftCode: "",
    },
    taxInfo: {
      taxId: "",
      taxIdentificationType: "",
      taxCountry: "",
    },
    portfolioUrls: [""],
  });

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    section?: string,
    field?: string
  ) => {
    if (section && field) {
      setFormData((prev) => ({
        ...prev,
        [section]: {
          ...(prev[section as keyof typeof prev] as object),
          [field]: e.target.value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const handlePortfolioChange = (index: number, value: string) => {
    const newPortfolioUrls = [...formData.portfolioUrls];
    newPortfolioUrls[index] = value;
    setFormData((prev) => ({
      ...prev,
      portfolioUrls: newPortfolioUrls,
    }));
  };

  const addPortfolioField = () => {
    setFormData((prev) => ({
      ...prev,
      portfolioUrls: [...prev.portfolioUrls, ""],
    }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name *</Label>
              <Input
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                placeholder="Enter your company name"
                required
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="website">Company Website</Label>
              <Input
                id="website"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                placeholder="https://your-company.com"
                className="w-full"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Bank Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="bankName">Bank Name *</Label>
                <Input
                  id="bankName"
                  value={formData.bankInfo.bankName}
                  onChange={(e) => handleInputChange(e, "bankInfo", "bankName")}
                  required
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="accountNumber">Account Number *</Label>
                <Input
                  id="accountNumber"
                  value={formData.bankInfo.accountNumber}
                  onChange={(e) =>
                    handleInputChange(e, "bankInfo", "accountNumber")
                  }
                  required
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="accountName">Account Name *</Label>
                <Input
                  id="accountName"
                  value={formData.bankInfo.accountName}
                  onChange={(e) =>
                    handleInputChange(e, "bankInfo", "accountName")
                  }
                  required
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="swiftCode">SWIFT Code</Label>
                <Input
                  id="swiftCode"
                  value={formData.bankInfo.swiftCode}
                  onChange={(e) =>
                    handleInputChange(e, "bankInfo", "swiftCode")
                  }
                  className="w-full"
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Tax Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="taxId">Tax ID *</Label>
                <Input
                  id="taxId"
                  value={formData.taxInfo.taxId}
                  onChange={(e) => handleInputChange(e, "taxInfo", "taxId")}
                  required
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="taxIdentificationType">
                 Tax Identification Type
                </Label>
          
                <Select>
                  <SelectTrigger >
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="VAT_ID">VAT ID</SelectItem>
                    <SelectItem value="TIN">TIN</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="taxCountry">Tax Country *</Label>

                <div className="w-[250px] h-[50px]">
                  <SelectInput3
                    props={{
                      inputType: {
                        className: "",
                        value: formData.taxInfo.taxCountry,
                        onChange: (e) => {
                          // handleInputChange(e, "taxInfo", "taxCountry");

                          setFormData((prev) => ({
                            ...prev,
                            ["taxInfo"]: {
                              ...prev["taxInfo"],
                              taxCountry: Object.keys(e.value)[0],
                            },
                          }));
                        },
                      },
                      kv: countryList.map((country) => ({
                        [country]: country,
                      })),
                      label: "",
                      placeholder: "Select Country",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Portfolio</h3>
            <div className="space-y-4">
              {formData.portfolioUrls.map((url, index) => (
                <div key={index} className="space-y-2">
                  <Label htmlFor={`portfolio-${index}`}>
                    Portfolio URL {index + 1}
                  </Label>
                  <Input
                    id={`portfolio-${index}`}
                    value={url}
                    onChange={(e) =>
                      handlePortfolioChange(index, e.target.value)
                    }
                    placeholder="https://example.com/portfolio"
                    className="w-full"
                  />
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={addPortfolioField}
                className="w-full mt-2"
              >
                Add Another Portfolio URL
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="min-h-screen bg-gray-50 w-full mt-4">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="space-y-6 md:space-y-8">
          <div className="space-y-2 text-center md:text-left">
            <h1 className="text-2xl md:text-3xl font-bold">
              Developer Onboarding
            </h1>
            <p className="text-gray-700 text-sm md:text-base">
              Complete your developer profile to start publishing games on our
              platform
            </p>
          </div>

          <Progress value={progress} className="w-full border " />

          <Alert className="bg-blue-50 border-blue-200">
            <Terminal className="h-4 w-4 flex-shrink-0" />
            <AlertDescription className="text-sm   ">
              Your application will be reviewed by our team before you can start
              publishing games.
            </AlertDescription>
          </Alert>

          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-lg md:text-xl">
                Step {currentStep} of {totalSteps}
              </CardTitle>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="p-4 md:p-6">{renderStep()}</CardContent>
              <CardFooter className="flex flex-col sm:flex-row gap-3 sm:justify-between p-4 md:p-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    setCurrentStep((prev) => Math.max(1, prev - 1))
                  }
                  disabled={currentStep === 1}
                  className="w-full sm:w-auto order-2 sm:order-1"
                >
                  Previous
                </Button>
                {currentStep < totalSteps ? (
                  <Button
                    type="button"
                    variant={currentStep === totalSteps ? "default" : "outline"}
                    onClick={() =>
                      setCurrentStep((prev) => Math.min(totalSteps, prev + 1))
                    }
                    className="w-full sm:w-auto order-1 sm:order-2"
                  >
                    Next <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                      type="submit" 
                      

                    onClick={async() => {
                      
                      console.log("submitting", formData);

                      const submitData:IDevData = {
                        countryOfResidence: formData.taxInfo.taxCountry,
                        taxIdentificationNumber: formData.taxInfo.taxId,
                        taxIdentificationType: formData.taxInfo.taxIdentificationType,
                        website: formData.website,
                        companyName: formData.companyName,
                        portfolioUrls: formData.portfolioUrls,
                        bankName: formData.bankInfo.bankName,
                        accountNumber: formData.bankInfo.accountNumber,
                        accountName: formData.bankInfo.accountName,
                      }

                      await createDev(submitData)
                      if(isSuccess){
                        setCurrentStep(1)
                      }
                      
                    }}
                      className="w-full sm:w-auto order-1 sm:order-2"
                      variant={'secondary'}
                  >
                      Submit Application {isLoading ? <Loading fullscreen={false} transparent={true}  size={28}  color="white"/>: <CheckCircle2 className="ml-2 h-4 w-4" />}
                  </Button>
                )}
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DeveloperOnboarding;
