<template>
  <div class="quiz-item">
    <div class="question">
      <strong>{{ item.text }}</strong>
    </div>

    <div v-if="item.type === 'mul_cho_one' || item.type === 'mul_cho_many'" class="choices">
      <p v-if="item.type === 'mul_cho_one'">This is a multiple choice question with one correct answer.</p>
      <p v-if="item.type === 'mul_cho_many'">This is a multiple choice question with multiple correct answers.</p>
      <h4>Choices:</h4>
      <ul>
        <li v-for="(choice, index) in item.choices" :key="index">
          <label>
            <input 
              type="checkbox" 
              v-if="item.type === 'mul_cho_many'" 
              :disabled="true" 
              :checked="choice.is_correct" 
            />
            <input 
              type="radio" 
              v-if="item.type === 'mul_cho_one'" 
              :disabled="true" 
              :checked="choice.is_correct" 
            />
            {{ choice.text }}
          </label>
        </li>
      </ul>
    </div>

    <div v-if="item.type === 'short_answer'" class="short-answer">
      <p>This is a short answer type question. User's answer would be displayed here.</p>
    </div>

    <div v-if="item.type === 'specific_answer'" class="specific-answer">
      <p>Answer can be a specific number or word.</p>
    </div>

    <div class="explanation">
      <h4>Explanation:</h4>
      <p v-html="item.explanation"></p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: Object, // Accepts an individual item as a prop
  },
};
</script>

<style scoped>
.quiz-item {
  padding: 20px;
  border: 1px solid #ddd;
  margin-bottom: 20px;
  border-radius: 8px;
}

.question {
  font-size: 1.5rem;
  margin-bottom: 15px;
}

.choices {
  margin-bottom: 15px;
}

.choices ul {
  list-style-type: none;
  padding-left: 0;
}

.choices li {
  margin-bottom: 10px;
}

.short-answer, .specific-answer {
  margin-bottom: 15px;
}

.explanation {
  margin-top: 20px;
  font-style: italic;
}

.explanation h4 {
  font-size: 1.2rem;
  margin-bottom: 10px;
}
</style>
