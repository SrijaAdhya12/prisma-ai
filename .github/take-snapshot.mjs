import puppeteer from 'puppeteer'
const sleep = (ms) => new Promise((res) => setTimeout(res, ms))

const takeSnapShot = async () => {
    const url = 'https://prisma-ai.vercel.app/' // Replace with your actual deployed URL
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.setViewport({ width: 1920, height: 1080 })
    await page.goto(url)
    await sleep(2000) // wait for the page to load
    await page.emulateMediaFeatures([{ name: "prefers-color-scheme", value: "light" }]);
    await page.reload()
    await page.screenshot({ path: '.github/preview-light.png' })
    await page.emulateMediaFeatures([{ name: "prefers-color-scheme", value: "dark" }]);
    await page.reload()
    await page.screenshot({ path: '.github/preview-dark.png' })
    await browser.close()
}

takeSnapShot()
