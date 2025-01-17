

export default function filterItems(items, keyword) {
    const filteredItems = [];

    items.forEach(item => {
        let rank = 0;

        if (item.name.toLowerCase().includes(keyword.toLowerCase())) {
            rank += 5;
        }

        if (keyword?.toLowerCase() === item.category?.toLowerCase() ||
            keyword?.toLowerCase() === item.brand?.toLowerCase() ||
            keyword?.toLowerCase() === item.store?.toLowerCase() ||
            keyword?.toLowerCase() === item.vendorName?.toLowerCase()) {
            rank += 4;
        }

        item.details.forEach(detail => {
            if (keyword?.toLowerCase() === detail.name?.toLowerCase() ||
                keyword?.toLowerCase() === detail.value?.toLowerCase()) {
                rank += 3;
            }
        });

        if (rank === 0 && item.name.toLowerCase().includes(keyword.toLowerCase())) {
            rank += 2;
        }

        if (rank === 0) {
            item.details.forEach(detail => {
                if (detail.name?.toLowerCase().includes(keyword?.toLowerCase()) ||
                    detail.value?.toLowerCase().includes(keyword?.toLowerCase())) {
                    rank += 1;
                }
            });
        }

        if (rank > 0) {
            filteredItems.push({ item, rank });
        }
    });

    filteredItems.sort((a, b) => b.rank - a.rank);

    return filteredItems.map(filteredItem => filteredItem.item);
}