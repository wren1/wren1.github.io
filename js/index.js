import { projectsArr } from './projects.js';

const projects = document.getElementById('projects');
const sidebarItems = document.getElementById('sidebar').childNodes;
const skillsList = document.getElementById('skills-list')
const contactContainer = document.getElementById("contact__container");
const contactForm = document.getElementById("contact-form");
const contactList = document.getElementById("contact__list");

let isFeatureActive = false;
let currentImage = null;
let currentImageCover = null;
let currentProject = null;
let currentFeature = null;

const makeList = (items) => {
    let list = '';
    items.forEach(item => {
        list += `<div class='list-item'>${item}</div>`
    })
    return list;
}

const fillImageDiv = () => {
    let projs = projectsArr.values();
    for (let proj of projs) {
        if (proj.name === currentProject) {
            if (!isFeatureActive) {
                console.log('not active: ', proj, currentImage)
                currentImage.style = `background-image:url("${proj.image}");`
            } else {
                let features = proj.features.values();
                for (let feature of features) {
                    if (feature.name === currentFeature) {
                        currentImage.style = `background-image:url("${feature.img}.gif");`
                        console.log('currFeature: ', feature)
                    }
                }
            }
        }
    }
}


const makeSpritesList = (category, items) => {
    let html = ''
            // ${item.descriptor}

    const itemHtml = (item) => (`
        <div class="${category}__list-item-wrapper">
            <svg width="100" height="100">
                <use xlink:href="SVG/si-sprite.svg#${item.sprite}" />
            </svg>
        </div>
    `)

    items.forEach(item => {

        html += (`
            <div class="${category}__list-item">
                ${!item.url ? itemHtml(item) : 
                `<a href="${item.url}">${itemHtml(item)}</a>`
            }
            </div>
            
        `)
    });

    return html;
}

const contacts = () => {
    const contactMethods = [
        {
            name: "Gmail",
            url: "mailto: wren.mcpherson@gmail.com",
            sprite: "si-logos-google-gmail",
            descriptor: "wren.mcpherson@gmail.com"
        },
        {
            name: "LinkedIn",
            url: "https://www.linkedin.com/in/wren-mcpherson/",
            sprite: "simple-icons-linkedin",
            descriptor: "LinkedIn"
        },
        {
            name: "Github",
            url: "https://github.com/wren1",
            sprite: "si-logos-github-icon",
            descriptor: "Github"
        }, 
        {
            name: "AngelList",
            url: "https://angel.co/u/wren-mcpherson",
            sprite: "si-logos-angellist",
            descriptor: "AngelList"
        },
    ]
    const contactMe = document.getElementById('contact-me');
    contactMe.innerHTML = `
        <div class='contact-desc'>
            email me at 
            <a class='email' href='mailto: wren.mcpherson@gmail.com'>wren.mcpherson@gmail.com</div>
        </div>
    `
    let listItems = makeSpritesList('contacts', contactMethods);
    contactList.innerHTML = `${listItems}`
}

const skillSprites = (tech) => {
    const list = [
        { name: 'JavaScript', sprite: 'si-logos-javascript' }, 
        { name: 'HTML', sprite: 'si-logos-html-5' }, 
        { name: 'CSS', sprite: 'si-logos-css-3_official' }, 
        { name: 'React', sprite: 'si-logos-react' }, 
        { name: 'Redux', sprite: 'si-logos-redux' }, 
        { name: 'Pug', sprite: 'si-logos-pug' }, 
        { name: 'PostgreSQL', sprite: 'si-logos-postgresql' }, 
        { name: 'Sequelize', sprite: 'si-logos-sequelize' }, 
        // { name: 'SQLAlchemy', sprite: 'javascript' }, 
        { name: 'Node.js', sprite: 'si-logos-nodejs' }, 
        { name: 'Python', sprite: 'si-dev-python' }, 
        { name: 'Flask', sprite: 'si-logos-flask' }, 
        { name: 'Heroku', sprite: 'si-logos-heroku' }, 
        { name: 'Github', sprite: 'si-logos-github-icon' }, 
        { name: 'Mocha', sprite: 'si-logos-mocha' }, 
        { name: 'Express', sprite: 'si-logos-express' }, 
        // { name: 'Git', sprite: 'si-logos-git' }, 
    ]
    let listObj = {
        'JavaScript': 'si-logos-javascript',
        'HTML': 'si-logos-html-5',
        'CSS': 'si-logos-css-3_official',
        'React': 'si-logos-react',
        'Redux': 'si-logos-redux',
        'Pug': 'si-logos-pug',
        'PostgreSQL': 'si-logos-postgresql',
        'Sequelize': 'si-logos-sequelize',
        'Node.js': 'si-logos-nodejs',
        'Python': 'si-dev-python',
        'Flask': 'si-logos-flask',
        'Heroku': 'si-logos-heroku',
        'Github': 'si-logos-github-icon',
        'Mocha': 'si-logos-mocha',
        'Express': 'si-logos-express',
        'Git': 'si-logos-git',
    }
    let skills;
    if (tech) {
        skills = [];
        tech.forEach(item => {
            skills.push({name: item, sprite: listObj[item]})
        })
        
        let techList = '<div class="project__tech-list">'
        skills.forEach(skill => {
            techList += (`
            <div class="skill__container">
                <div class="skill">
                    <svg width="100" height="100">
                        <use xlink:href="SVG/si-sprite.svg#${skill.sprite}" />
                    </svg>
                    <div class="skill-name">${skill.name}</div>
                </div>
            </div>
        `)
        })
        techList += '</div>'
        return techList;

    } else {
        skills = list;
    
        skills.forEach(skill => {
            skillsList.innerHTML += (`
                <div class="skill__container">
                    <div class="skill">
                        <svg width="100" height="100">
                            <use xlink:href="SVG/si-sprite.svg#${skill.sprite}" />
                        </svg>
                        <div class="skill-name">${skill.name}</div
                    </div>
                </div>
            `)
        })
    }
}

const makeFeaturesList = (features, project) => {
    let list = '';
    features.forEach(feature => {
        list += `<div class='feature ${project.toLowerCase()}'>${feature.name}</div>`
    })
    return list;
}

const projectElement = (project) => {
    return (`
    <div class='section'>
        <div id='${project.name.toLowerCase()}' class='project'>
            <div class='header project-title'>
                <a href='${project.url}' class='project-link'>
                    ${project.name}
                </a>
            </div>
            <div class='project__info'>
                <div class='subtitle project-description'>${project.description}</div>
                <div class='title'>Technologies used:</div>
                ${skillSprites(project.tech)}
                <div class='title'>Features:</div>
                <div class='project__features-list'>${makeFeaturesList(project.features, project.name)}</div>
            </div>
            <div class='project__image-wrapper'>
            <div class='project__image-under' style="background-image:url('${project.image}');" />
            <div class='project__image' style="background-image:url('${project.image}');" />
            </div>
            <a href="${project.url}" class="project-link url">Visit ${project.name}</a>
        </div>
    </div>
`)
}

const imageHover = () => {
    let images = document.querySelectorAll('.project__image');
    console.log(images)
    images.forEach(image => {
        image.addEventListener('mouseenter', e => {
            const project = image.parentElement.parentElement.parentElement.id;
            image.style["background-image"] = `url("/images/${project}/index.gif")`;
            console.log('image leave: ', image.style["background-image"])
        })
        image.addEventListener('mouseleave', e => {
            const project = image.parentElement.parentElement.parentElement.id;
            image.style["background-image"] = `url("/images/${project}/index.png")`;
            console.log('image leave: ', image.style["background-image"])
        })
    })
}

window.addEventListener('DOMContentLoaded', e => {
    // <img src='${project.image}' class='project__image' style="background-image:url('${project.image}');" />
    // <div class='project__image' style='background-image:url("${project.image}");' />
    skillSprites();
    contacts();

    sidebarItems.forEach(item => {
        item.addEventListener('click', e => {
            window.location.href = `#${(e.target.innerHTML).toLowerCase()}`
        })
    })


    projectsArr.forEach(project => {
        projects.innerHTML += projectElement(project);
    });


    imageHover();

    let features = document.querySelectorAll('.feature')
    features.forEach(feature => {
        feature.addEventListener('mouseenter', e => {
            const project = document.getElementById(`${feature.classList[1]}`)
            const imageContainer = project.querySelector('.project__image');
            const imageCover = project.querySelector('.project__image-under')
            isFeatureActive = true;
            currentImage = imageContainer;
            currentImageCover = imageCover;
            currentProject = feature.classList[1][0].toUpperCase() + feature.classList[1].slice(1);
            currentFeature = feature.innerHTML
            // console.log('enter: ', isFeatureActive, currentImage, currentProject, feature.innerHTML)
            fillImageDiv();
        })
        feature.addEventListener('mouseleave', e => {
            const project = document.getElementById(`${feature.classList[1]}`)
            const imageContainer = project.querySelector('.project__image');
            const imageCover = project.querySelector('.project__image-under')
            isFeatureActive = false;
            fillImageDiv();
            currentImage = null;
            currentImageCover = null;
            currentProject = null;
            currentFeature = null;
        })
    })

    

})