
/**
 * Check for newly added cards to mark them
 * via CSS animation
 */
class CheckForCardsPlayed {

    constructor(sCardIdPrefix) 
    { 
        this.vsBefore = [];
        this.vsAfter = [];
        this.cardIdPrefix = sCardIdPrefix;
    }

    /**
     * Get all image ids inside a given container
     * 
     * @param {Object} pContainer DOM 
     */
    getCards(pContainer)
    {
        return pContainer === null ? [] : this.getCardsFromList(pContainer.querySelectorAll("img"));
    }

    getCardsFromList(list)
    {
        let jList = [];

        for (let i = 0; i < list.length; i++)
        {
            let sId = list[i].getAttribute("data-uuid");
            if (sId !== null && sId !== "")
                jList.push(sId);
        }

        return jList;
    }

    /**
     * Check for all cards
     * @param {DOM} pContainer 
     */
    loadBefore(pContainer)
    {
        this.vsBefore = this.getCards(pContainer);
    }

    /**
     * Check for all cards
     * @param {DOM} pContainer 
     */
    loadAfter(pContainer)
    {
        this.vsAfter = this.getCards(pContainer);
    }

    /**
     * Mark the newly added cards
     */
    mark()
    {
        this.markCards(this.identifyNewCards())
    }

    /**
     * Get all those cards that are available only in the "after" array
     * 
     * @returns {array} id list
     */
    identifyNewCards()
    {
        if (this.vsAfter.length === 0)
            return [];

        let vsNew = [];
        let nSize = this.vsAfter.length;
        for (var i = 0; i < nSize; i++)
        {
            if (!this.vsBefore.includes(this.vsAfter[i]))
                vsNew.push(this.vsAfter[i]);
        }

        return vsNew;
    }
    
    /**
     * Mark a list of cards by their IDs
     * 
     * @param {array} vsIds 
     */
    markCards(vsIds)
    {
        const nSize = vsIds.length;
        for (var i = 0; i < nSize; i++)
            CheckForCardsPlayed.markCard(this.cardIdPrefix + vsIds[i]);
    }

    /**
     * Mark a specific card by its id
     * @param {String} sId 
     */
    static markCard(sId)
    {
        let elem = document.getElementById(sId);
        if (elem !== null)
            elem.classList.add("card-highlight");
    }
};

/**
 * Check for company cards
 */
class CheckForCardsPlayedCompany extends CheckForCardsPlayed
{
    constructor(sCardIdPrefix) 
    { 
        super(sCardIdPrefix);
    }

    /**
     * Get all cards of a given company 
     * 
     * @param {Object} pContainer DOM Element 
     */
    getCards(pContainer)
    {
        let list = [];

        ArrayList(pContainer).find(".company-characters").each((_char) =>
        {
            ArrayList(_char).find("img").each((_img) => list.push(_img));
        });
        
        return super.getCardsFromList(list);
    }

}