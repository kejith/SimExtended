import './style/main.less'


function base64Encode(str) {
    return window.btoa(str);
}

function base64Decode(str) {
    return window.atob(str);
}

class BattleEngineStateObject {
    constructor() {
        this.attackers = [];
        this.defenders = [];
        this.slots = 2;
    }

    addField(participantId, type, fieldKey, fieldValue) {
        if (type === "attacker") {
            if (!this.attackers[participantId])
                this.attackers.push({})

            this.attackers[participantId][fieldKey] = fieldValue;
        } else if (type === "defender") {
            if (!this.defenders[participantId])
                this.defenders.push({})

            this.defenders[participantId][fieldKey] = fieldValue;

        } else {
            throw new Error("Unknown type: " + type);
        }
    }

    toJSON() {
        return JSON.stringify(this.toObject())
    }

    toObject() {
        return {
            attackers: this.attackers,
            defenders: this.defenders,
            slots: this.slots,
        }
    }

    toApiString() {
        return base64Encode(stringify(this.toObject()))
    }

}

import { parse, stringify } from 'zipson';

(function () {
    $(`#form`).last().after(/*html*/ `
    <table>
        <tbody>
                <tr>
                    <td colspan="">
                        <textarea id="import-string" name="import-string" rows="8" ></textarea>
                        <input id="import" type="button" value="Importieren" />
                        <input id="generate" type="button" value="Erstellen" />
                    </td>
                </tr>
        </tbody>
    </table>
    `)

    var ele = $('#generate').on("click", (e) => {
        $(this).children('#import-string').remove()
        var formStr = $('#form').serialize()

        var formData = new URLSearchParams(formStr)
        var formDataArray = Array.from(formData)
        var formDataObject = {}

        var state = new BattleEngineStateObject()

        formDataArray.forEach((item) => {
            var key = item[0]
            var value = item[1]

            var types = ["attacker", "defender"]
            if (key !== 'slots') {
                var bracketRegex = /\[(.+?)\]/g
                var matches = [...key.matchAll(bracketRegex)]
                var [participantId, type, fieldKey] = matches.map(match => match[1])
                var key = `${participantId}_${type}_${fieldKey}`
                state.addField(participantId, types[type], fieldKey, value)
            } else {
                state.slots = parseInt(value)
            }


            formDataObject[key] = value
        })

        $('#import-string').val(base64Encode(stringify(state.toObject())))
    })

    $('#import').on("click", (e) => {
        var importString = $('#import-string').val()
        var importObject = parse(base64Decode(importString))

        var state = new BattleEngineStateObject()

        state.attackers = importObject.attackers
        state.defenders = importObject.defenders
        state.slots = importObject.slots


        var formData = new URLSearchParams()
        var formObject = {}
        var types = ["attacker", "defender"]

        var parseParticipant = (participant, index, type) => {
            Object.keys(participant).forEach((fieldKey) => {
                var key = `battleinput[${index}][${type}][${fieldKey}]`
                var value = participant[fieldKey]
                formData.append(key, value)
                formObject[key] = value
            })
        }

        state.attackers.forEach((attacker, index) => {
            parseParticipant(attacker, index, 0)
        })

        state.defenders.forEach((defender, index) => {
            parseParticipant(defender, index, 1)
        })

        formData.append("slots", state.slots)
        formObject["slots"] = state.slots - 1
        


        var form = $("<form action='game.php?page=battleSimulator' name='battlesim' method='post' id='import-form'></form>")
        
        // loop over formObject and add each element to the form
        for (var key in formObject) {
            form.append(`<input type="hidden" name="${key}" value="${formObject[key]}" />`)
        }
        // add the form to the page before submitting it
        $("body").append(form)
        // submit the form
        $("#import-form").submit()


        
    })

})();
