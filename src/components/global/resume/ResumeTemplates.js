const templates = [
    {
        categoryName: "کاراموزی",
        categoryNameEng: "internship",
        id: 0,
        templates: [
            {
                view: "sampleImagePath",
                id: 0,
            },
            {
                view: "sampleImagePath",
                id: 1,

            },
            {
                view: "sampleImagePath",
                id: 2,

            },
            {
                view: "sampleImagePath",
                id: 3,

            }
        ]
    },
    {
        categoryName: "دانش آموزی",
        categoryNameEng: "student",
        id: 1,
        templates: [
            {
                view: "sampleImagePath",
                id: 5,
            },
            {
                view: "sampleImagePath",
                id: 6,

            },
            {
                view: "sampleImagePath",
                id: 7,

            },
            {
                view: "sampleImagePath",
                id: 8,

            }
        ]
    },
    {
        categoryName: "متن نمونه",
        categoryNameEng: "lorem ipsum",
        id: 2,
        templates: [
            {
                view: "sampleImagePath",
                id: 9,
            },
            {
                view: "sampleImagePath",
                id: 10,

            },
            {
                view: "sampleImagePath",
                id: 11,

            },
            {
                view: "sampleImagePath",
                id: 12,

            }
        ]
    },


]

export function getResumeTemplates() {
    return templates;
}