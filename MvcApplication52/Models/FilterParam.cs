namespace MvcApplication52.Models
{
    public class FilterParam
    {
        public FilterParam()
        {
            this.IndexName = string.Empty;
            this.SortField = string.Empty;
            this.Sort = "false";
        }
        /// <summary>Gets or sets the pageindex.</summary>
        public int from { get; set; }

        /// <summary>Gets or sets the pagesize.</summary>
        public int size { get; set; }

        /// <summary>Gets or sets the filter text.</summary>
        public string FilterText { get; set; }

        /// <summary>Gets or sets the ındex name.</summary>
        public string IndexName { get; set; }

        /// <summary>Gets or sets the sort field.</summary>
        public string SortField { get; set; }

        /// <summary>Gets or sets the sort.</summary>
        public string Sort { get; set; }

        /// <summary>Gets or sets the ıp address.</summary>
        public string IpAddress { get; set; }

        /// <summary>Gets or sets the search field.</summary>
        public string SearchField { get; set; }

        /// <summary>Gets or sets the search field value.</summary>
        public string SearchFieldValue { get; set; }

    }
}