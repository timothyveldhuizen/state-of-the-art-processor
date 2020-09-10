<template>
  <div>
    <label for="file-upload">Choose a file to process:</label>
    <input
      type="file"
      id="file-upload"
      name="file-upload"
      accept="text/csv, text/xml"
      @change="handleFileUploadChange"
    />
    <RecordTable v-if="fileIsUploaded" :records="validatedRecords" />
    <p v-else>No results, please upload a file to process</p>
  </div>
</template>

<script>
import RecordTable from './RecordTable';
import { parseFile, validateRecords } from 'form-submission-processor';

export default {
  name: 'FileUpload',
  components: {
      RecordTable,
  },
  data() {
    return {
      fileIsUploaded: false,
      validatedRecords: [],
    };
  },
  methods: {
    handleFileUploadChange(e) {
      const file = e.target.files[0];
      if (file) {
        console.log(e.target.files[0]);
        // file.stream().getReader().read().then(readerObject => console.log('readerObject',readerObject));
        // file.arrayBuffer().then(buffer => console.log('buffer',buffer));
        file.text().then((text) => {
          console.log("text", text);
          const parsedFile = parseFile(text, file.type);
          console.log("parsedFile", parsedFile);
          this.validatedRecords = validateRecords(parsedFile);
          console.log("validatedRecords", this.validatedRecords);
          this.fileIsUploaded = true;
        });
      }
      this.validatedRecords = [];
      this.fileIsUploaded = false;
    },
  },
};
</script>

<style scoped>
</style>