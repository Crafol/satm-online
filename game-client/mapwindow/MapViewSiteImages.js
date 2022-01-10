/**
 * Adds game card image functionality to the map. If shows card images and lists of site cards
 */
 class MapViewSiteImages  {

    constructor(jMap, jTappedSites)
    {
        this.CardPreview = CardPreview;
        this.CardList = new CardList(jMap.images, []);

        this._temp = null;
        this.jMap = jMap.map === undefined ? {} : jMap.map;
        this.jMapSiteRegion = jMap.mapregions === undefined ? {} : jMap.mapregions;

        if (jTappedSites !== undefined)
            this.jTappedSites = jTappedSites;
    }

    createEntry(jEntry, isSite, region)
    {
        this._temp.push({ 
            set_code : jEntry["set_code"], 
            image : jEntry["image"], 
            code: jEntry["code"], 
            site: isSite === true, 
            region: region
        });
    }

    static getAdditionalAlignKeys()
    { 
        return ["fallenwizard", "fallenlord", "lord", "grey", "dragonlord", "warlord", "elflord", "atanilord", "dwarflord"]; 
    }

    static removeQuotes(sImage)
    {
        if (sImage.indexOf('"') === -1)
            return sImage;
        
        const len = sImage.length;
        for (let i = 0; i < len; i++)
        {
            if (sImage[i] === '"')
                sImage[i] = "_";
        }
        
        return sImage;
    }

    static getCardBacksideImageUrl()
    {
        return "/media/assets/images/cards/backside-region.jpg";
    }

    createInstance()
    {
        document.body.addEventListener("meccg-map-show-images", this.onShowImages.bind(this), false);
        document.body.addEventListener("meccg-map-search", this.onSearch.bind(this), false);
    }

    onSearch(e)
    {
        const text = e.detail.text;

        if(text === "")
            return;
        else
            console.log("todo");
    }

    onShowImages(e)
    {
        const region = e.detail.region === undefined ? "" : e.detail.region;
        const site = e.detail.site === undefined ? "" : e.detail.site;

        if (region === "" && site === "")
            return;
        
        const jRegion = this.jMap[region];
        if (jRegion === undefined)
            return;

        this.pushRegion(jRegion, region);

        const showAlignment = this.createSearchLimitations();
        for (let key in jRegion.sites)
        {
            if (site === "" || site === key)
                this.getSiteImages(jRegion.sites[key], showAlignment, region);
        }
        
        this.fillSiteList();
        this.lazyloadImages();
    }

    createImage(code, isSite, isTapped, region)
    {
        const sType = isSite ? "site" : "location";
        const sTapped = isTapped !== undefined && isTapped ? 'site-is-tapped' : "site-image";
        const sTitle = MapViewSiteImages.removeQuotes(code) + " (" + sType + ")";
        const sUrl = isSite ? this.CardList.getImageSite(code) : this.CardList.getImageRegion(code);
        
        const img = document.createElement("img");
        img.setAttribute("decoding", "async");
        img.setAttribute("class", sTapped);
        img.setAttribute("data-src", sUrl);
        img.setAttribute("src", MapViewSiteImages.getCardBacksideImageUrl());
        img.setAttribute("data-code", code);
        img.setAttribute("data-location-type", sType);
        img.setAttribute("title", sTitle);
        img.setAttribute("data-region", region)
        img.onclick = this.onClickCard.bind(this);
        return img;
    }

    onClickCard(e)
    {
        const elem = e.target;
        const image = elem.getAttribute("src");
        const code = elem.getAttribute("data-code");
        const isSite = "site" === elem.getAttribute("data-location-type");
        const regionName = elem.getAttribute("data-region");

        document.body.dispatchEvent(new CustomEvent("meccg-map-siteclick", { "detail":  {
            region: regionName,
            code: code,
            imgage: image,
            isSite : isSite
        } }));
    }


    createSearchLimitations()
    {
        const keys = MapViewSiteImages.getAdditionalAlignKeys();
        const showAlignment = 
        {
            "hero": g_pRegionMapPreferences.showSite("hero"),
            "minion": g_pRegionMapPreferences.showSite("minion"),
            "balrog":  g_pRegionMapPreferences.showSite("balrog")
        }

        for(let key of keys)
            showAlignment[key] = g_pRegionMapPreferences.showSite(key);

        return showAlignment;
    }

    verifyTempArray()
    {
        if (this._temp === null)
            this._temp = [];
    }

    pollCardResultList()
    {
        if (this._temp === null)
            return [];
    
        const _res = this._temp;
        this._temp = null;
        return _res;
    }

    pushRegion(j, region)
    {
        this.verifyTempArray();
        if (j !== undefined)
            this.createEntry(j, false, region);
    }

    getSiteImages(j, showAlignment, region)
    {
        this.verifyTempArray();

        if (showAlignment === undefined)
            showAlignment = this.createSearchLimitations();
        
        if (typeof j.hero !== "undefined" && showAlignment.hero)
            this.createEntry(j.hero, true, region);

        if (typeof j.minion !== "undefined" && showAlignment.minion)
            this.createEntry(j.minion, true, region);

        if (typeof j.balrog !== "undefined" && showAlignment.balrog)
            this.createEntry(j.balrog, true, region);
        
        const keys = MapViewSiteImages.getAdditionalAlignKeys();
        for(let key of keys)
        {
            if (typeof j[key] !== "undefined" && showAlignment[key])
                this.createEntry(j[key], true, region);
        }
    }

    lazyloadImageClasses(sSelector)
    {
        const list = document.querySelectorAll(sSelector);
        if (list === null || list.length === 0)
            return;

        const len = list.length;
        for (let i = 0; i < len; i++)
        {
            const _src = list[i].getAttribute("data-src");
            if (_src !== undefined && _src !== null && _src !== "")
            {
                list[i].setAttribute("src", list[i].getAttribute("data-src"));
                list[i].setAttribute("data-src", "");

                this.CardPreview.initMapViewCard(list[i]);
            }
        }
    }
    
    lazyloadImages()
    {
        setTimeout(() => this.lazyloadImageClasses("img.site-image"), 50);
        setTimeout(() => this.lazyloadImageClasses("img.site-is-tapped"), 50);
    }

    isSiteTapped(code)
    {
        return this.jTappedSites[code] !== undefined;
    }

    destroy()
    {
        DomUtils.removeAllChildNodes(document.getElementById("found_sites"));
    }

    fillSiteList()
    {
        DomUtils.removeAllChildNodes(document.getElementById("found_sites"));

        const res = this.pollCardResultList();
        if (res.length === 0)
            return;
        
        const jTarget = document.getElementById("found_sites");
        for (let _card of res)
            jTarget.appendChild(this.createImage(_card.code, _card.site, this.isSiteTapped(_card.code), _card.region));
    }
}