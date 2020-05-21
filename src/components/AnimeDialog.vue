<template>
  <v-card>
    <v-container fluid>
      <v-card-title>{{ title }} </v-card-title>
      <v-row justify="start" v-if="Object.keys(sns).length < 2">
        <v-col v-for="(oneSn, index) in sns['']" :key="oneSn.sn" md="1">
          <v-row justify="center">
            <v-btn
              :disabled="!oneSn.canDownload"
              @click="
                downloadAnimation(title, oneSn.number, oneSn.sn, false, index)
              "
            >
              {{ oneSn.number }}
            </v-btn>
          </v-row>
        </v-col>
      </v-row>
      <div v-else>
        <div style="font-size: 18px;font-weight: bold">本篇</div>
        <v-row justify="start">
          <v-col v-for="(oneSn, index) in sns['main']" :key="oneSn.sn" md="1">
            <v-row justify="center">
              <v-btn
                :disabled="!oneSn.canDownload"
                @click="
                  downloadAnimation(title, oneSn.number, oneSn.sn, false, index)
                "
              >
                {{ oneSn.number }}
              </v-btn>
            </v-row>
          </v-col>
        </v-row>
        <div style="font-size: 18px;font-weight: bold">特別篇</div>
        <v-row justify="start">
          <v-col
            v-for="(oneSn, index) in sns['special']"
            :key="oneSn.sn"
            md="1"
          >
            <v-row justify="center">
              <v-btn
                :disabled="!oneSn.canDownload"
                @click="
                  downloadAnimation(title, oneSn.number, oneSn.sn, true, index)
                "
              >
                {{ oneSn.number }}
              </v-btn>
            </v-row>
          </v-col>
        </v-row>
      </div>
      <v-dialog v-model="alert" max-width="40%" persistent>
        <v-card>
          <v-card-title>此動畫為18禁動畫，請登陸後再執行下載</v-card-title>
          <v-card-actions>
            <v-spacer />
            <v-btn @click="alert = false">close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </v-card>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
@Component
export default class AnimeDialog extends Vue {
  @Prop() sns?: {
    special: {
      sn: string;
      number: string;
      canDownload: boolean;
    }[];
    "": {
      sn: string;
      number: string;
      canDownload: boolean;
    }[];
    main: {
      sn: string;
      number: string;
      canDownload: boolean;
    }[];
  };
  @Prop(String) title?: string;
  alert = false;

  downloadAnimation(
    title: string,
    ep: string,
    sn: string,
    spacial: boolean,
    index: number
  ) {
    if (this.sns) {
      if (spacial) {
        this.sns["special"][index].canDownload = false;
      } else {
        if (Object.keys(this.sns).length < 2) {
          this.sns[""][index].canDownload = false;
        } else {
          this.sns["main"][index].canDownload = false;
        }
      }
      window.insertAnimeToQueue(title, ep, sn, spacial).then(result => {
        if (!result) {
          this.alert = true;
          if (this.sns) {
            if (spacial) {
              this.sns["special"][index].canDownload = true;
            } else {
              if (Object.keys(this.sns).length < 2) {
                this.sns[""][index].canDownload = true;
              } else {
                this.sns["main"][index].canDownload = true;
              }
            }
          }
        }
      });
    }
  }
}
</script>
