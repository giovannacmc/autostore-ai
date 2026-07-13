-- CreateTable
CREATE TABLE "AssistantRateLimit" (
    "id" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "windowStart" TIMESTAMP(3) NOT NULL,
    "requestCount" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AssistantRateLimit_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "AssistantRateLimit_windowStart_idx" ON "AssistantRateLimit"("windowStart");

-- CreateIndex
CREATE UNIQUE INDEX "AssistantRateLimit_identifier_windowStart_key" ON "AssistantRateLimit"("identifier", "windowStart");
