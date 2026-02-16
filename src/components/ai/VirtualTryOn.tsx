import { useState, useRef } from "react";
import { Upload, Sparkles, Loader2, Download, X, Check, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { allProducts, categories, type Product } from "@/data/products";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

type Step = "select-product" | "upload-selfie" | "processing" | "result";

const VirtualTryOn = () => {
  const { toast } = useToast();
  const [step, setStep] = useState<Step>("select-product");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selfie, setSelfie] = useState<string | null>(null);
  const [tryOnResult, setTryOnResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [customDesc, setCustomDesc] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredProducts = activeCategory === "All"
    ? allProducts
    : allProducts.filter(p => p.category === activeCategory);

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setCustomDesc("");
    setStep("upload-selfie");
  };

  const handleSelfieUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast({ title: "File too large", description: "Please upload an image under 5MB.", variant: "destructive" });
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setSelfie(reader.result as string);
    reader.readAsDataURL(file);
  };

  const buildJewelryDescription = () => {
    if (customDesc.trim()) return customDesc;
    if (!selectedProduct) return "";
    const p = selectedProduct;
    return `${p.name} — ${p.description}. Material: ${p.metal}, Purity: ${p.purity}. Category: ${p.category}.`;
  };

  const getProductImageBase64 = async (): Promise<string | null> => {
    if (!selectedProduct) return null;
    try {
      const resp = await fetch(selectedProduct.image);
      const blob = await resp.blob();
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = () => resolve(null);
        reader.readAsDataURL(blob);
      });
    } catch {
      return null;
    }
  };

  const handleTryOn = async () => {
    if (!selfie) return;
    const desc = buildJewelryDescription();
    if (!desc) return;

    setLoading(true);
    setStep("processing");
    setTryOnResult(null);

    try {
      const productImageBase64 = await getProductImageBase64();
      const resp = await fetch(`${SUPABASE_URL}/functions/v1/ai-try-on`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${SUPABASE_KEY}` },
        body: JSON.stringify({ selfieBase64: selfie, jewelryDescription: desc, jewelryImageBase64: productImageBase64 }),
      });
      if (!resp.ok) {
        const err = await resp.json().catch(() => ({ error: "Failed" }));
        throw new Error(err.error || "Try-on failed");
      }
      const data = await resp.json();
      if (data.imageUrl) {
        setTryOnResult(data.imageUrl);
        setStep("result");
      } else {
        throw new Error("No image returned from AI");
      }
    } catch (e: any) {
      toast({ title: "Try-On Error", description: e.message, variant: "destructive" });
      setStep("upload-selfie");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setStep("select-product");
    setSelectedProduct(null);
    setSelfie(null);
    setTryOnResult(null);
    setCustomDesc("");
  };

  const stepNumber = step === "select-product" ? 1 : step === "upload-selfie" ? 2 : step === "processing" ? 3 : 3;

  return (
    <div className="space-y-6">
      {/* Progress Steps */}
      <div className="flex items-center justify-center gap-2 mb-2">
        {[
          { num: 1, label: "Select Jewelry" },
          { num: 2, label: "Upload Photo" },
          { num: 3, label: "See Result" },
        ].map(({ num, label }) => (
          <div key={num} className="flex items-center gap-2">
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-body transition-colors ${
              stepNumber >= num
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground"
            }`}>
              {stepNumber > num ? <Check className="h-3 w-3" /> : <span>{num}</span>}
              <span className="hidden sm:inline">{label}</span>
            </div>
            {num < 3 && <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* Step 1: Select Product */}
        {step === "select-product" && (
          <motion.div key="select" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
            <h3 className="font-display text-xl font-semibold mb-1">Choose Jewelry to Try On</h3>
            <p className="text-sm text-muted-foreground font-body mb-4">
              Select a piece from our collection, or describe your own below.
            </p>

            {/* Category Filter */}
            <ScrollArea className="w-full mb-4">
              <div className="flex gap-2 pb-2">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`shrink-0 text-xs px-3 py-1.5 rounded-full font-body transition-colors ${
                      activeCategory === cat
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-accent"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>

            {/* Product Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-6">
              {filteredProducts.map(product => (
                <button
                  key={product.id}
                  onClick={() => handleSelectProduct(product)}
                  className="group text-left rounded-xl border border-border overflow-hidden hover:border-primary/50 hover:shadow-md transition-all bg-card"
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-2.5">
                    <p className="text-xs font-body font-medium truncate">{product.name}</p>
                    <p className="text-[11px] text-muted-foreground font-body">{product.category} · {product.metal}</p>
                  </div>
                </button>
              ))}
            </div>

            {/* Custom description option */}
            <div className="border-t border-border pt-4">
              <p className="text-xs text-muted-foreground font-body mb-2">Or describe custom jewelry:</p>
              <div className="flex gap-2">
                <Input
                  placeholder="e.g., Gold choker necklace with ruby pendant and matching jhumka earrings"
                  value={customDesc}
                  onChange={(e) => setCustomDesc(e.target.value)}
                  className="font-body text-sm"
                />
                <Button
                  onClick={() => { setSelectedProduct(null); setStep("upload-selfie"); }}
                  disabled={!customDesc.trim()}
                  className="shrink-0 bg-primary text-primary-foreground hover:bg-gold-dark font-body"
                >
                  Next
                </Button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 2: Upload Selfie */}
        {step === "upload-selfie" && (
          <motion.div key="upload" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Selected product preview */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-lg font-semibold">Selected Jewelry</h3>
                  <Button variant="ghost" size="sm" className="text-xs font-body" onClick={() => setStep("select-product")}>
                    <ChevronLeft className="h-3 w-3 mr-1" /> Change
                  </Button>
                </div>

                {selectedProduct ? (
                  <div className="rounded-xl border border-border overflow-hidden bg-card">
                    <div className="aspect-[4/3] overflow-hidden">
                      <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-3">
                      <p className="font-body font-semibold text-sm">{selectedProduct.name}</p>
                      <p className="text-xs text-muted-foreground font-body mt-0.5">{selectedProduct.metal} · {selectedProduct.purity}</p>
                      <p className="text-xs text-muted-foreground font-body mt-1 line-clamp-2">{selectedProduct.description}</p>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-xl border border-border p-4 bg-card">
                    <p className="font-body text-sm font-medium">Custom Description</p>
                    <p className="text-xs text-muted-foreground font-body mt-1">{customDesc}</p>
                  </div>
                )}
              </div>

              {/* Selfie upload */}
              <div className="space-y-3">
                <h3 className="font-display text-lg font-semibold">Upload Your Photo</h3>
                <p className="text-xs text-muted-foreground font-body">
                  Upload a clear, front-facing photo. AI will detect your features and position the jewelry realistically.
                </p>

                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleSelfieUpload} className="hidden" />

                {selfie ? (
                  <div className="relative aspect-square rounded-xl overflow-hidden border border-border">
                    <img src={selfie} alt="Your photo" className="w-full h-full object-cover" />
                    <button
                      onClick={() => setSelfie(null)}
                      className="absolute top-2 right-2 p-1.5 bg-background/80 backdrop-blur-sm rounded-full"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full aspect-square rounded-xl border-2 border-dashed border-border hover:border-primary/40 transition-colors flex flex-col items-center justify-center gap-3 bg-muted/30"
                  >
                    <Upload className="h-10 w-10 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground font-body">Click to upload your photo</span>
                    <span className="text-[11px] text-muted-foreground/60 font-body">JPG, PNG up to 5MB</span>
                  </button>
                )}

                <Button
                  onClick={handleTryOn}
                  disabled={!selfie || loading}
                  className="w-full bg-primary text-primary-foreground hover:bg-gold-dark font-body"
                >
                  <Sparkles className="h-4 w-4 mr-2" /> Try On Now
                </Button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 3a: Processing */}
        {step === "processing" && (
          <motion.div key="processing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center py-16 gap-4">
            <div className="relative">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
              <Sparkles className="h-5 w-5 text-primary absolute -top-1 -right-1 animate-pulse" />
            </div>
            <div className="text-center">
              <p className="font-display text-lg font-semibold">AI is working its magic...</p>
              <p className="text-sm text-muted-foreground font-body mt-1">
                Detecting facial features and positioning jewelry. This may take 15-30 seconds.
              </p>
            </div>
          </motion.div>
        )}

        {/* Step 3b: Result */}
        {step === "result" && tryOnResult && (
          <motion.div key="result" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Before */}
              <div className="space-y-2">
                <p className="text-xs font-body font-medium text-muted-foreground uppercase tracking-wider">Your Photo</p>
                <div className="aspect-square rounded-xl overflow-hidden border border-border">
                  <img src={selfie!} alt="Original" className="w-full h-full object-cover" />
                </div>
              </div>
              {/* After */}
              <div className="space-y-2">
                <p className="text-xs font-body font-medium text-primary uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="h-3 w-3" /> AI Try-On Result
                </p>
                <div className="aspect-square rounded-xl overflow-hidden border-2 border-primary/30">
                  <img src={tryOnResult} alt="Try-on result" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>

            {selectedProduct && (
              <div className="mt-4 p-3 rounded-xl bg-muted/50 border border-border flex items-center gap-3">
                <img src={selectedProduct.image} alt="" className="h-12 w-12 rounded-lg object-cover" />
                <div>
                  <p className="text-sm font-body font-semibold">{selectedProduct.name}</p>
                  <p className="text-xs text-muted-foreground font-body">{selectedProduct.price} · {selectedProduct.metal}</p>
                </div>
              </div>
            )}

            <div className="flex gap-3 mt-4">
              <a href={tryOnResult} download="tanishq-tryon.png">
                <Button variant="outline" size="sm" className="font-body gap-2">
                  <Download className="h-4 w-4" /> Download
                </Button>
              </a>
              <Button variant="outline" size="sm" className="font-body" onClick={reset}>
                Try Another
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VirtualTryOn;
