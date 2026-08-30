import { packColor } from "../../config.js"
import { copyURL, localize, rgbaBind } from "../../util.js"
import Copied from "../Copied.js"
import Copy from "../Copy.js"
import Section from "./Section.js"

export default {
    props: {
        rank: {
            type: Number,
            required: true
        },
        entry: {
            type: Object,
            required: true,
        }
    },
    components: { Copy, Copied, Section },
    template: `
        <div class="player-container">
            <div class="player">
                <div class="copy-container">
                    <h1 class="copy-name" style="padding-right:0.3rem;">
                        #{{ rank }} {{ entry.user }}
                    </h1>
                    <img class="flag" v-if="entry.flag" :src="'https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg/' + entry.flag.toLowerCase() + '.svg'" alt="flag" style="margin-right: 10px;width:50px">
                    <Copy
                        v-if="!copied"
                        @click="copyURL('https://glorpulon.pages.dev/#/leaderboard/user/' + entry.user.toLowerCase().replaceAll(' ', '_')); copied = true"
                    ></Copy>
                    <Copied
                        v-if="copied"
                        @click="copyURL('https://glorpulon.pages.dev/#/leaderboard/user/' + entry.user.toLowerCase().replaceAll(' ', '_')); copied = true"
                    ></Copied>
                </div>
                <h4>{{ localize(entry.total) + " / " + localize(entry.possibleMax) }}</h4>
                <div class="pack-container" v-if="entry.userPacks.length > 0">
                    <a v-for="pack in entry.userPacks" class="pack" :style="{ 'background': rgbaBind(packColor(pack.difficulty), 0.2) }" :href="'https://glorupulon.pages.dev/#/packs/pack/' + pack.name.toLowerCase().replaceAll(' ', '_')">{{ pack.name }}</a>
                </div>
                <h4 v-if="entry.completed">Hardest: <strong>#{{entry.completed[0].rank}}: {{entry.completed[0].level}}</strong> (+{{entry.completed[0].score}})</h4>
                <Section label="Created" :scores="entry.created" />
                <Section label="Verified" :scores="entry.verified" />
                <Section label="Completed" :scores="entry.completed" />
                <Section label="Progressed" :scores="entry.progressed" />
            </div>
        </div>
    `,
    methods: {
        copyURL,
        localize,
        rgbaBind,
        packColor,
    }
}
