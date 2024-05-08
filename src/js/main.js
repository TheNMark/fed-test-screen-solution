var reportsWidget = {
    options: {
        containerSelector: '.reports',
        template: (
            '{{#.}}' +
            '<article class="reports_item">' +
            '<a href="{{cover}}" target="_blank">' +
            '<img class="reports_cover" src="{{cover}}" alt="{{title}} Cover" title="{{title}} Cover"/>' +
            '</a>' +
            '<footer class="reports_docs">' +
            '{{#documents}}' +
            '<h3 class="reports_title">' +
            '<a href="{{url}}" target="_blank" title="{{title}}">{{title}} <span>({{file_size}} {{file_type}})</span></a>' +
            '</h3>' +
            '{{/documents}}' +
            '</footer>' +
            '</article>' +
            '{{/.}}'
        )
    },

    init: function (reports) {
        this.reports = [...reports];
        // for (var i = 0; i < 100; i++) {
        //     this.reports = [...this.reports, ...reports];
        // }
        this.itemsPerPage = 24;
        this.currentPage = 1;
        this.renderInitialReports();
        this.renderExtraReports.bind(this);
        this.funcScrollListener = this.scrollListener.bind(this);
        window.addEventListener("scroll", this.funcScrollListener);``
    },
    
    renderInitialReports: function () {
        var inst = this,
            options = inst.options,
            container = $(options.containerSelector);
            
        container.empty().append(Mustache.render(options.template, this.reports.slice(0, this.itemsPerPage)));
    },

    scrollListener: function (event) {
        if ((window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight) {
            this.renderExtraReports();
        };
    },

    renderExtraReports: function () {
        if (this.reports.length < (this.currentPage + 1) * this.itemsPerPage) {
            window.removeEventListener("scroll", this.funcScrollListener);
            return;
        }
        this.currentPage++;
        var inst = this,
            options = inst.options,
            container = $(options.containerSelector);
            
        container.append(Mustache.render(options.template, this.reports.slice(this.currentPage * this.itemsPerPage, (this.currentPage + 1) * this.itemsPerPage)));
    }
};



reportsWidget.init(reportData);
