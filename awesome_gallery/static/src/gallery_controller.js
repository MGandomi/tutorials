import { Layout } from "@web/search/layout";
import { useService } from "@web/core/utils/hooks";
import { KeepLast } from "@web/core/utils/concurrency";
import { Component, onWillStart, onWillUpdateProps, useState } from "@odoo/owl";
import { standardViewProps } from "@web/views/standard_view_props";

export class GalleryController extends Component {
    static template = "awesome_gallery.GalleryController";
    static props = {
        ...standardViewProps,
        archInfo: Object,
    };
    static components = { Layout };

    setup() {
        this.orm = useService("orm");
        this.images = useState({ data: [] });
        this.keeplast = new KeepLast();

        const loadAndSetImages = async (domain) => {
            const { records } = await this.loadImages(domain);
            this.images.data = records;
        };

        onWillStart(() => loadAndSetImages(this.props.domain));

        onWillUpdateProps((nextProps) => {
            if (JSON.stringify(nextProps.domain) !== JSON.stringify(this.props.domain)) {
                return loadAndSetImages(nextProps.domain);
            }
        });
    }

    loadImages(domain) {
        if (!this.props.archInfo || !this.props.archInfo.imageField) {
            return Promise.resolve({ records: [] });
        }

        return this.keeplast.add(
            this.orm.webSearchRead(this.props.resModel, domain, {
                limit: this.props.archInfo.limit,
                specification: {
                    [this.props.archInfo.imageField]: {},
                },
                context: {
                    bin_size: true,
                },
            })
        );
    }
}
